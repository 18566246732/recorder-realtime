/**
 * 用来实现音频流转采样率以及位深的worker方法。
 * TODO: 暂时来说采样率的转写只支持由高转低。不支持由低转高
 */
import lamejs from "lamejs";

(function() {
  'use strict';
  let recorder;

  self.onmessage = function(e) {
    switch (e.data.command) {
      case 'encode':
        if (recorder) {
          recorder.record(e.data.buffers);
        }
        break;

      case 'done':
        if (recorder) {
          recorder.requestData();
        }
        break;

      case 'init':
        recorder = new WavePCM(e.data);
        break;

      default:
      // Ignore any unknown commands and continue recieving commands
    }
  };

  var WavePCM = function(config) {
    config = Object.assign(
      {
        wavBitDepth: 16
      },
      config
    );

    // if (!config['wavSampleRate']) {
    //   throw new Error('wavSampleRate value is required to record. NOTE: Audio is not resampled!')
    // }

    if ([8, 16, 24, 32].indexOf(config.wavBitDepth) === -1) {
      throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');
    }

    this.bitDepth = config.wavBitDepth;
    this.sampleRate = config.wavSampleRate;
    this.originalSampleRate = config.originalSampleRate;
    this.recordedBuffers = [];
    this.format = config.format;
    this.bytesPerSample = this.bitDepth / 8;
    this.mp3Encoder = new lamejs.Mp3Encoder(config.numberOfChannels, config.wavSampleRate, config.bitDepth);
  };

  WavePCM.prototype.interleave = function(e) {
    const t = e.length;
    this.originalSampleRate += 0.0;
    this.sampleRate += 0.0;
    let s = 0;
    const o = this.originalSampleRate / this.sampleRate;
    const u = Math.ceil((t * this.sampleRate) / this.originalSampleRate);
    const a = new Float32Array(u);
    for (let i = 0; i < u; i++) {
      a[i] = e[Math.floor(s)];
      s += o;
    }
    return a;
  };

  WavePCM.prototype.record = function(buffers) {
    buffers = this.interleave(buffers[0]);
    this.numberOfChannels = this.numberOfChannels || 1;
    const bufferLength = buffers.length;
    const reducedData = new Uint8Array(bufferLength * this.numberOfChannels * this.bytesPerSample);

    // Interleave
    for (let i = 0; i < bufferLength; i++) {
      for (let channel = 0; channel < this.numberOfChannels; channel++) {
        const outputIndex = (i * this.numberOfChannels + channel) * this.bytesPerSample;

        // clip the signal if it exceeds [-1, 1]
        // var sample = Math.max(-1, Math.min(1, buffers[channel][i]))
        let sample = Math.max(-1, Math.min(1, buffers[i]));

        // bit reduce and convert to integer
        switch (this.bytesPerSample) {
          case 4: // 32 bits signed
            sample = sample * 2147483647.5 - 0.5;
            reducedData[outputIndex] = sample;
            reducedData[outputIndex + 1] = sample >> 8;
            reducedData[outputIndex + 2] = sample >> 16;
            reducedData[outputIndex + 3] = sample >> 24;
            break;

          case 3: // 24 bits signed
            sample = sample * 8388607.5 - 0.5;
            reducedData[outputIndex] = sample;
            reducedData[outputIndex + 1] = sample >> 8;
            reducedData[outputIndex + 2] = sample >> 16;
            break;

          case 2: // 16 bits signed
            sample = sample * 32767.5 - 0.5;
            reducedData[outputIndex] = sample;
            reducedData[outputIndex + 1] = sample >> 8;
            break;

          case 1: // 8 bits unsigned
            reducedData[outputIndex] = (sample + 1) * 127.5;
            break;

          default:
            throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');
        }
      }
    }

    self.postMessage({ command: 'buffer', buffer: this.format === 'mp3' ?  res : reducedData });
    this.recordedBuffers.push(reducedData);
  };

  WavePCM.prototype.requestData = function() {
    const bufferLength = this.recordedBuffers[0].length;
    const dataLength = this.recordedBuffers.length * bufferLength;
    const headerLength = 44;
    const wav = new Uint8Array(headerLength + dataLength);
    const view = new DataView(wav.buffer);

    view.setUint32(0, 1380533830, false); // RIFF identifier 'RIFF'
    view.setUint32(4, 36 + dataLength, true); // file length minus RIFF identifier length and file description length
    view.setUint32(8, 1463899717, false); // RIFF type 'WAVE'
    view.setUint32(12, 1718449184, false); // format chunk identifier 'fmt '
    view.setUint32(16, 16, true); // format chunk length
    view.setUint16(20, 1, true); // sample format (raw)
    view.setUint16(22, this.numberOfChannels, true); // channel count
    view.setUint32(24, this.sampleRate, true); // sample rate
    view.setUint32(28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true); // byte rate (sample rate * block align)
    view.setUint16(32, this.bytesPerSample * this.numberOfChannels, true); // block align (channel count * bytes per sample)
    view.setUint16(34, this.bitDepth, true); // bits per sample
    view.setUint32(36, 1684108385, false); // data chunk identifier 'data'
    view.setUint32(40, dataLength, true); // data chunk length

    for (let i = 0; i < this.recordedBuffers.length; i++) {
      wav.set(this.recordedBuffers[i], i * bufferLength + headerLength);
    }

    self.postMessage({ command: 'wav', data: wav.buffer });
    self.postMessage(null);
    self.close();
  };
})();
