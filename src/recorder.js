'use strict';

// 兼容性写法
const AudioContext = window.AudioContext || window.webkitAudioContext;
const WavWorker = require('./encoder.worker.js');

// Recoder的构造函数
const Recorder = function(config) {
  if (!Recorder.isRecordingSupported()) {
    throw new Error('Recording is not supported in this browser');
  }

  this.state = 'inactive';
  this.config = Object.assign(
    {
      bufferLength: 4096, // 每一段buffer的大小
      encoderApplication: 2049,
      encoderFrameSize: 20,
      // encoderPath: './encoder.worker.js', // worker文件的存储位置
      encoderSampleRate: 48000, // 目标采样率
      leaveStreamOpen: false,
      maxBuffersPerPage: 40,
      mediaTrackConstraints: true,
      monitorGain: -1, // 创造回声, 这里注意要把值设置为-1才是无声的状态
      numberOfChannels: 1, // 声道数
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      recordingGain: 1, // 录音的大小
      resampleQuality: 3,
      streamPages: false,
      wavBitDepth: 16, // 位深
      recorderFrequency: 1 // 录制音频的频率
    },
    config
  );

  this.initWorker();
};

// 静态方法
// 检查浏览器是否支持使用录音功能
Recorder.isRecordingSupported = function() {
  return (
    AudioContext && window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia && window.WebAssembly
  );
};

// Instance Methods
Recorder.prototype.clearStream = function() {
  if (this.stream) {
    if (this.stream.getTracks) {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    } else {
      this.stream.stop();
    }

    delete this.stream;
  }

  if (this.audioContext) {
    this.audioContext.close();
    delete this.audioContext;
  }
};

Recorder.prototype.encodeBuffers = function(inputBuffer) {
  if (this.state === 'recording') {
    const buffers = [];
    for (let i = 0; i < inputBuffer.numberOfChannels; i++) {
      buffers[i] = inputBuffer.getChannelData(i);
    }

    this.encoder.postMessage({
      command: 'encode',
      buffers
    });
  }
};

Recorder.prototype.initAudioContext = function(sourceNode) {
  if (sourceNode && sourceNode.context) {
    this.audioContext = sourceNode.context;
  }

  if (!this.audioContext) {
    this.audioContext = new AudioContext();
  }

  return this.audioContext;
};

Recorder.prototype.initAudioGraph = function() {
  const self = this;

  // First buffer can contain old data. Don't encode it.
  this.encodeBuffers = function() {
    delete this.encodeBuffers;
  };

  this.scriptProcessorNode = this.audioContext.createScriptProcessor(
    this.config.bufferLength,
    this.config.numberOfChannels,
    this.config.numberOfChannels
  );
  this.scriptProcessorNode.connect(this.audioContext.destination);
  this.scriptProcessorNode.onaudioprocess = function(e) {
    self.encodeBuffers(e.inputBuffer);
  };

  this.monitorGainNode = this.audioContext.createGain();
  this.setMonitorGain(this.config.monitorGain);
  this.monitorGainNode.connect(this.audioContext.destination);

  // 录音音调
  this.filterNode = this.audioContext.createBiquadFilter();
  // - type
  this.filterNode.type = 'lowshelf';
  this.setFrequency(this.config.recorderFrequency);

  // 3D环绕效果
  this.pannerNode = this.audioContext.createPanner();
  this.setPosition(this.config.positionX, this.config.positionY, this.config.positionZ);
  this.pannerNode.connect(this.audioContext.destination);

  this.recordingGainNode = this.audioContext.createGain();
  this.setRecordingGain(this.config.recordingGain);
  this.recordingGainNode.connect(this.scriptProcessorNode);
};

Recorder.prototype.initSourceNode = function(sourceNode) {
  const self = this;

  if (sourceNode && sourceNode.context) {
    return window.Promise.resolve(sourceNode);
  }

  if (this.stream && this.sourceNode) {
    return window.Promise.resolve(this.sourceNode);
  }

  return window.navigator.mediaDevices.getUserMedia({ audio: this.config.mediaTrackConstraints }).then(function(stream) {
    self.stream = stream;
    return self.audioContext.createMediaStreamSource(stream);
  });
};

Recorder.prototype.initWorker = function() {
  const self = this;
  const streamPage = function(e) {
    self.streamPage(e.data);
  };
  const storePage = function(e) {
    self.storePage(e.data);
  };

  this.recordedPages = [];
  this.totalLength = 0;
  this.encoder = new WavWorker();
  this.encoder.addEventListener('message', this.config.streamPages ? streamPage : storePage);
};

Recorder.prototype.pause = function() {
  if (this.state === 'recording') {
    this.state = 'paused';
    this.onpause();
  }
};

Recorder.prototype.resume = function() {
  if (this.state === 'paused') {
    this.state = 'recording';
    this.onresume();
  }
};

Recorder.prototype.setRecordingGain = function(gain) {
  this.config.recordingGain = gain;

  if (this.recordingGainNode && this.audioContext) {
    this.recordingGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
  }
};

Recorder.prototype.setMonitorGain = function(gain) {
  this.config.monitorGain = gain;

  if (this.monitorGainNode && this.audioContext) {
    this.monitorGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
  }
};

// 扩展改变录音音调的方法
Recorder.prototype.setFrequency = function(frequency) {
  this.config.filterNode = frequency;

  if (this.filterNode && this.audioContext) {
    this.filterNode.frequency.value = frequency;
  }
};

// 3D环绕效果
Recorder.prototype.setPosition = function(x, y, z) {
  this.config.positionX = x;
  this.config.positionY = y;
  this.config.positionZ = z;

  if (this.pannerNode && this.audioContext) {
    this.pannerNode.setPosition(x, y, z);
  }
};

Recorder.prototype.start = function(sourceNode) {
  if (this.state === 'inactive') {
    const self = this;
    const config = JSON.parse(JSON.stringify(self.config));
    this.initAudioContext(sourceNode);
    this.initAudioGraph();

    return this.initSourceNode(sourceNode).then(function(sourceNode) {
      self.state = 'recording';
      self.encoder.postMessage(
        Object.assign(
          {
            command: 'init',
            originalSampleRate: self.audioContext.sampleRate,
            wavSampleRate: self.audioContext.sampleRate
          },
          config
        )
      );
      self.sourceNode = sourceNode;
      self.sourceNode.connect(self.monitorGainNode);
      self.sourceNode.connect(self.recordingGainNode);
      self.sourceNode.connect(self.filterNode); // 挂载音频频率的修改器
      self.sourceNode.connect(self.pannerNode); // 挂载3d
      self.onstart(); // 自动开始
    });
  }
};

Recorder.prototype.stop = function() {
  if (this.state !== 'inactive') {
    this.state = 'inactive';
    this.monitorGainNode.disconnect();
    this.scriptProcessorNode.disconnect();
    this.recordingGainNode.disconnect();
    this.sourceNode.disconnect();

    if (!this.config.leaveStreamOpen) {
      this.clearStream();
    }

    this.encoder.postMessage({ command: 'done' });
  }
};

Recorder.prototype.storePage = function(page) {
  if (page === null) {
    const outputData = new Uint8Array(this.totalLength);
    this.recordedPages.reduce(function(offset, page) {
      outputData.set(page, offset);
      return offset + page.length;
    }, 0);

    this.ondataavailable(outputData);
    this.initWorker();
    this.onstop();
  } else {
    this.recordedPages.push(page);
    this.totalLength += page.length;
  }
};

Recorder.prototype.streamPage = function(page) {
  if (page === null) {
    this.initWorker();
    this.onstop();
  } else {
    this.ondataavailable(page);
  }
};

// Callback Handlers
Recorder.prototype.ondataavailable = function() {};
Recorder.prototype.onpause = function() {};
Recorder.prototype.onresume = function() {};
Recorder.prototype.onstart = function() {};
Recorder.prototype.onstop = function() {};

export default Recorder;
