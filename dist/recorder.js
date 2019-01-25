module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recorder.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/worker-loader/dist/workers/InlineWorker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/worker-loader/dist/workers/InlineWorker.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string\n\nvar URL = window.URL || window.webkitURL;\n\nmodule.exports = function (content, url) {\n  try {\n    try {\n      var blob;\n\n      try {\n        // BlobBuilder = Deprecated, but widely implemented\n        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;\n\n        blob = new BlobBuilder();\n\n        blob.append(content);\n\n        blob = blob.getBlob();\n      } catch (e) {\n        // The proposed API\n        blob = new Blob([content]);\n      }\n\n      return new Worker(URL.createObjectURL(blob));\n    } catch (e) {\n      return new Worker('data:application/javascript,' + encodeURIComponent(content));\n    }\n  } catch (e) {\n    if (!url) {\n      throw Error('Inline worker is not supported');\n    }\n\n    return new Worker(url);\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/worker-loader/dist/workers/InlineWorker.js?");

/***/ }),

/***/ "./src/encoder.worker.js":
/*!*******************************!*\
  !*** ./src/encoder.worker.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function () {\n  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ \"./node_modules/worker-loader/dist/workers/InlineWorker.js\")(\"/******/ (function(modules) { // webpackBootstrap\\n/******/ \\t// The module cache\\n/******/ \\tvar installedModules = {};\\n/******/\\n/******/ \\t// The require function\\n/******/ \\tfunction __webpack_require__(moduleId) {\\n/******/\\n/******/ \\t\\t// Check if module is in cache\\n/******/ \\t\\tif(installedModules[moduleId]) {\\n/******/ \\t\\t\\treturn installedModules[moduleId].exports;\\n/******/ \\t\\t}\\n/******/ \\t\\t// Create a new module (and put it into the cache)\\n/******/ \\t\\tvar module = installedModules[moduleId] = {\\n/******/ \\t\\t\\ti: moduleId,\\n/******/ \\t\\t\\tl: false,\\n/******/ \\t\\t\\texports: {}\\n/******/ \\t\\t};\\n/******/\\n/******/ \\t\\t// Execute the module function\\n/******/ \\t\\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\\n/******/\\n/******/ \\t\\t// Flag the module as loaded\\n/******/ \\t\\tmodule.l = true;\\n/******/\\n/******/ \\t\\t// Return the exports of the module\\n/******/ \\t\\treturn module.exports;\\n/******/ \\t}\\n/******/\\n/******/\\n/******/ \\t// expose the modules object (__webpack_modules__)\\n/******/ \\t__webpack_require__.m = modules;\\n/******/\\n/******/ \\t// expose the module cache\\n/******/ \\t__webpack_require__.c = installedModules;\\n/******/\\n/******/ \\t// define getter function for harmony exports\\n/******/ \\t__webpack_require__.d = function(exports, name, getter) {\\n/******/ \\t\\tif(!__webpack_require__.o(exports, name)) {\\n/******/ \\t\\t\\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\\n/******/ \\t\\t}\\n/******/ \\t};\\n/******/\\n/******/ \\t// define __esModule on exports\\n/******/ \\t__webpack_require__.r = function(exports) {\\n/******/ \\t\\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\\n/******/ \\t\\t\\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\\n/******/ \\t\\t}\\n/******/ \\t\\tObject.defineProperty(exports, '__esModule', { value: true });\\n/******/ \\t};\\n/******/\\n/******/ \\t// create a fake namespace object\\n/******/ \\t// mode & 1: value is a module id, require it\\n/******/ \\t// mode & 2: merge all properties of value into the ns\\n/******/ \\t// mode & 4: return value when already ns object\\n/******/ \\t// mode & 8|1: behave like require\\n/******/ \\t__webpack_require__.t = function(value, mode) {\\n/******/ \\t\\tif(mode & 1) value = __webpack_require__(value);\\n/******/ \\t\\tif(mode & 8) return value;\\n/******/ \\t\\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\\n/******/ \\t\\tvar ns = Object.create(null);\\n/******/ \\t\\t__webpack_require__.r(ns);\\n/******/ \\t\\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\\n/******/ \\t\\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\\n/******/ \\t\\treturn ns;\\n/******/ \\t};\\n/******/\\n/******/ \\t// getDefaultExport function for compatibility with non-harmony modules\\n/******/ \\t__webpack_require__.n = function(module) {\\n/******/ \\t\\tvar getter = module && module.__esModule ?\\n/******/ \\t\\t\\tfunction getDefault() { return module['default']; } :\\n/******/ \\t\\t\\tfunction getModuleExports() { return module; };\\n/******/ \\t\\t__webpack_require__.d(getter, 'a', getter);\\n/******/ \\t\\treturn getter;\\n/******/ \\t};\\n/******/\\n/******/ \\t// Object.prototype.hasOwnProperty.call\\n/******/ \\t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\\n/******/\\n/******/ \\t// __webpack_public_path__\\n/******/ \\t__webpack_require__.p = \\\"\\\";\\n/******/\\n/******/\\n/******/ \\t// Load entry module and return exports\\n/******/ \\treturn __webpack_require__(__webpack_require__.s = \\\"./src/encoder.worker.js\\\");\\n/******/ })\\n/************************************************************************/\\n/******/ ({\\n\\n/***/ \\\"./src/encoder.worker.js\\\":\\n/*!*******************************!*\\\\\\n  !*** ./src/encoder.worker.js ***!\\n  \\\\*******************************/\\n/*! no static exports found */\\n/***/ (function(module, exports) {\\n\\neval(\\\"/**\\\\n * 用来实现音频流转采样率以及位深的worker方法。\\\\n * TODO: 暂时来说采样率的转写只支持由高转低。不支持由低转高\\\\n */\\\\n(function() {\\\\n  'use strict';\\\\n  let recorder;\\\\n\\\\n  self.onmessage = function(e) {\\\\n    switch (e.data.command) {\\\\n      case 'encode':\\\\n        if (recorder) {\\\\n          recorder.record(e.data.buffers);\\\\n        }\\\\n        break;\\\\n\\\\n      case 'done':\\\\n        if (recorder) {\\\\n          recorder.requestData();\\\\n        }\\\\n        break;\\\\n\\\\n      case 'init':\\\\n        recorder = new WavePCM(e.data);\\\\n        break;\\\\n\\\\n      default:\\\\n      // Ignore any unknown commands and continue recieving commands\\\\n    }\\\\n  };\\\\n\\\\n  var WavePCM = function(config) {\\\\n    config = Object.assign(\\\\n      {\\\\n        wavBitDepth: 16\\\\n      },\\\\n      config\\\\n    );\\\\n\\\\n    // if (!config['wavSampleRate']) {\\\\n    //   throw new Error('wavSampleRate value is required to record. NOTE: Audio is not resampled!')\\\\n    // }\\\\n\\\\n    if ([8, 16, 24, 32].indexOf(config.wavBitDepth) === -1) {\\\\n      throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');\\\\n    }\\\\n\\\\n    this.bitDepth = config.wavBitDepth;\\\\n    this.sampleRate = config.wavSampleRate;\\\\n    this.originalSampleRate = config.originalSampleRate;\\\\n    this.recordedBuffers = [];\\\\n    this.bytesPerSample = this.bitDepth / 8;\\\\n  };\\\\n\\\\n  WavePCM.prototype.interleave = function(e) {\\\\n    const t = e.length;\\\\n    this.originalSampleRate += 0.0;\\\\n    this.sampleRate += 0.0;\\\\n    let s = 0;\\\\n    const o = this.originalSampleRate / this.sampleRate;\\\\n    const u = Math.ceil((t * this.sampleRate) / this.originalSampleRate);\\\\n    const a = new Float32Array(u);\\\\n    for (let i = 0; i < u; i++) {\\\\n      a[i] = e[Math.floor(s)];\\\\n      s += o;\\\\n    }\\\\n    return a;\\\\n  };\\\\n\\\\n  WavePCM.prototype.record = function(buffers) {\\\\n    buffers = this.interleave(buffers[0]);\\\\n    this.numberOfChannels = this.numberOfChannels || 1;\\\\n    const bufferLength = buffers.length;\\\\n    const reducedData = new Uint8Array(bufferLength * this.numberOfChannels * this.bytesPerSample);\\\\n\\\\n    // Interleave\\\\n    for (let i = 0; i < bufferLength; i++) {\\\\n      for (let channel = 0; channel < this.numberOfChannels; channel++) {\\\\n        const outputIndex = (i * this.numberOfChannels + channel) * this.bytesPerSample;\\\\n\\\\n        // clip the signal if it exceeds [-1, 1]\\\\n        // var sample = Math.max(-1, Math.min(1, buffers[channel][i]))\\\\n        let sample = Math.max(-1, Math.min(1, buffers[i]));\\\\n\\\\n        // bit reduce and convert to integer\\\\n        switch (this.bytesPerSample) {\\\\n          case 4: // 32 bits signed\\\\n            sample = sample * 2147483647.5 - 0.5;\\\\n            reducedData[outputIndex] = sample;\\\\n            reducedData[outputIndex + 1] = sample >> 8;\\\\n            reducedData[outputIndex + 2] = sample >> 16;\\\\n            reducedData[outputIndex + 3] = sample >> 24;\\\\n            break;\\\\n\\\\n          case 3: // 24 bits signed\\\\n            sample = sample * 8388607.5 - 0.5;\\\\n            reducedData[outputIndex] = sample;\\\\n            reducedData[outputIndex + 1] = sample >> 8;\\\\n            reducedData[outputIndex + 2] = sample >> 16;\\\\n            break;\\\\n\\\\n          case 2: // 16 bits signed\\\\n            sample = sample * 32767.5 - 0.5;\\\\n            reducedData[outputIndex] = sample;\\\\n            reducedData[outputIndex + 1] = sample >> 8;\\\\n            break;\\\\n\\\\n          case 1: // 8 bits unsigned\\\\n            reducedData[outputIndex] = (sample + 1) * 127.5;\\\\n            break;\\\\n\\\\n          default:\\\\n            throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');\\\\n        }\\\\n      }\\\\n    }\\\\n\\\\n    self.postMessage({ command: 'buffer', buffer: reducedData });\\\\n    this.recordedBuffers.push(reducedData);\\\\n  };\\\\n\\\\n  WavePCM.prototype.requestData = function() {\\\\n    const bufferLength = this.recordedBuffers[0].length;\\\\n    const dataLength = this.recordedBuffers.length * bufferLength;\\\\n    const headerLength = 44;\\\\n    const wav = new Uint8Array(headerLength + dataLength);\\\\n    const view = new DataView(wav.buffer);\\\\n\\\\n    view.setUint32(0, 1380533830, false); // RIFF identifier 'RIFF'\\\\n    view.setUint32(4, 36 + dataLength, true); // file length minus RIFF identifier length and file description length\\\\n    view.setUint32(8, 1463899717, false); // RIFF type 'WAVE'\\\\n    view.setUint32(12, 1718449184, false); // format chunk identifier 'fmt '\\\\n    view.setUint32(16, 16, true); // format chunk length\\\\n    view.setUint16(20, 1, true); // sample format (raw)\\\\n    view.setUint16(22, this.numberOfChannels, true); // channel count\\\\n    view.setUint32(24, this.sampleRate, true); // sample rate\\\\n    view.setUint32(28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true); // byte rate (sample rate * block align)\\\\n    view.setUint16(32, this.bytesPerSample * this.numberOfChannels, true); // block align (channel count * bytes per sample)\\\\n    view.setUint16(34, this.bitDepth, true); // bits per sample\\\\n    view.setUint32(36, 1684108385, false); // data chunk identifier 'data'\\\\n    view.setUint32(40, dataLength, true); // data chunk length\\\\n\\\\n    for (let i = 0; i < this.recordedBuffers.length; i++) {\\\\n      wav.set(this.recordedBuffers[i], i * bufferLength + headerLength);\\\\n    }\\\\n\\\\n    self.postMessage({ command: 'wav', data: wav.buffer });\\\\n    self.postMessage(null);\\\\n    self.close();\\\\n  };\\\\n})();\\\\n\\\\n\\\\n//# sourceURL=webpack:///./src/encoder.worker.js?\\\");\\n\\n/***/ })\\n\\n/******/ });\", null);\n};\n\n//# sourceURL=webpack:///./src/encoder.worker.js?");

/***/ }),

/***/ "./src/recorder.js":
/*!*************************!*\
  !*** ./src/recorder.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 兼容性写法\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar AudioContext = window.AudioContext || window.webkitAudioContext;\nvar WavWorker = __webpack_require__(/*! ./encoder.worker.js */ \"./src/encoder.worker.js\");\n\n// Recoder的构造函数\nvar Recorder = function Recorder(config) {\n  if (!Recorder.isRecordingSupported()) {\n    throw new Error('Recording is not supported in this browser');\n  }\n\n  this.state = 'inactive';\n  this.config = Object.assign({\n    bufferLength: 4096, // 每一段buffer的大小\n    encoderApplication: 2049,\n    encoderFrameSize: 20,\n    // encoderPath: './encoder.worker.js', // worker文件的存储位置\n    encoderSampleRate: 48000, // 目标采样率\n    leaveStreamOpen: false,\n    maxBuffersPerPage: 40,\n    mediaTrackConstraints: true,\n    monitorGain: 0, // 创造回声, 这里注意要把值设置为-1才是无声的状态\n    numberOfChannels: 1, // 声道数\n    recordingGain: 1, // 录音的大小\n    resampleQuality: 3,\n    streamPages: false,\n    wavBitDepth: 16 // 位深\n  }, config);\n  this.initWorker();\n};\n\n// 静态方法\n// 检查浏览器是否支持使用录音功能\nRecorder.isRecordingSupported = function () {\n  return AudioContext && window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia && window.WebAssembly;\n};\n// Instance Methods\nRecorder.prototype.clearStream = function () {\n  if (this.stream) {\n    if (this.stream.getTracks) {\n      this.stream.getTracks().forEach(function (track) {\n        track.stop();\n      });\n    } else {\n      this.stream.stop();\n    }\n\n    delete this.stream;\n  }\n\n  if (this.audioContext) {\n    this.audioContext.close();\n    delete this.audioContext;\n  }\n};\n\nRecorder.prototype.encodeBuffers = function (inputBuffer) {\n  if (this.state === 'recording') {\n    var buffers = [];\n    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {\n      buffers[i] = inputBuffer.getChannelData(i);\n    }\n\n    this.encoder.postMessage({\n      command: 'encode',\n      buffers: buffers\n    });\n  }\n};\n\nRecorder.prototype.initAudioContext = function (sourceNode) {\n  if (sourceNode && sourceNode.context) {\n    this.audioContext = sourceNode.context;\n  }\n\n  if (!this.audioContext) {\n    this.audioContext = new AudioContext();\n  }\n\n  return this.audioContext;\n};\nRecorder.prototype.initAudioGraph = function () {\n  var self = this;\n\n  // First buffer can contain old data. Don't encode it.\n  this.encodeBuffers = function () {\n    delete this.encodeBuffers;\n  };\n\n  this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels);\n  this.scriptProcessorNode.connect(this.audioContext.destination);\n  this.scriptProcessorNode.onaudioprocess = function (e) {\n    self.encodeBuffers(e.inputBuffer);\n  };\n\n  this.monitorGainNode = this.audioContext.createGain();\n  this.setMonitorGain(this.config.monitorGain);\n  this.monitorGainNode.connect(this.audioContext.destination);\n  this.recordingGainNode = this.audioContext.createGain();\n  this.setRecordingGain(this.config.recordingGain);\n  this.recordingGainNode.connect(this.scriptProcessorNode);\n};\nRecorder.prototype.initSourceNode = function (sourceNode) {\n  var self = this;\n\n  if (sourceNode && sourceNode.context) {\n    return window.Promise.resolve(sourceNode);\n  }\n\n  if (this.stream && this.sourceNode) {\n    return window.Promise.resolve(this.sourceNode);\n  }\n\n  return window.navigator.mediaDevices.getUserMedia({ audio: this.config.mediaTrackConstraints }).then(function (stream) {\n    self.stream = stream;\n    return self.audioContext.createMediaStreamSource(stream);\n  });\n};\n\nRecorder.prototype.initWorker = function () {\n  var self = this;\n  var streamPage = function streamPage(e) {\n    self.streamPage(e.data);\n  };\n  var storePage = function storePage(e) {\n    self.storePage(e.data);\n  };\n\n  this.recordedPages = [];\n  this.totalLength = 0;\n  this.encoder = new WavWorker();\n  this.encoder.addEventListener('message', this.config.streamPages ? streamPage : storePage);\n};\n\nRecorder.prototype.pause = function () {\n  if (this.state === 'recording') {\n    this.state = 'paused';\n    this.onpause();\n  }\n};\n\nRecorder.prototype.resume = function () {\n  if (this.state === 'paused') {\n    this.state = 'recording';\n    this.onresume();\n  }\n};\n\nRecorder.prototype.setRecordingGain = function (gain) {\n  this.config.recordingGain = gain;\n\n  if (this.recordingGainNode && this.audioContext) {\n    this.recordingGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\n\nRecorder.prototype.setMonitorGain = function (gain) {\n  this.config.monitorGain = gain;\n\n  if (this.monitorGainNode && this.audioContext) {\n    this.monitorGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\nRecorder.prototype.start = function (sourceNode) {\n  if (this.state === 'inactive') {\n    var self = this;\n    var config = JSON.parse(JSON.stringify(self.config));\n    this.initAudioContext(sourceNode);\n    this.initAudioGraph();\n\n    return this.initSourceNode(sourceNode).then(function (sourceNode) {\n      self.state = 'recording';\n      self.encoder.postMessage(Object.assign({\n        command: 'init',\n        originalSampleRate: self.audioContext.sampleRate,\n        wavSampleRate: self.audioContext.sampleRate\n      }, config));\n      self.sourceNode = sourceNode;\n      self.sourceNode.connect(self.monitorGainNode);\n      self.sourceNode.connect(self.recordingGainNode);\n      self.onstart(); // 自动开始\n    });\n  }\n};\nRecorder.prototype.stop = function () {\n  if (this.state !== 'inactive') {\n    this.state = 'inactive';\n    this.monitorGainNode.disconnect();\n    this.scriptProcessorNode.disconnect();\n    this.recordingGainNode.disconnect();\n    this.sourceNode.disconnect();\n\n    if (!this.config.leaveStreamOpen) {\n      this.clearStream();\n    }\n\n    this.encoder.postMessage({ command: 'done' });\n  }\n};\n\nRecorder.prototype.storePage = function (page) {\n  if (page === null) {\n    var outputData = new Uint8Array(this.totalLength);\n    this.recordedPages.reduce(function (offset, page) {\n      outputData.set(page, offset);\n      return offset + page.length;\n    }, 0);\n\n    this.ondataavailable(outputData);\n    this.initWorker();\n    this.onstop();\n  } else {\n    this.recordedPages.push(page);\n    this.totalLength += page.length;\n  }\n};\n\nRecorder.prototype.streamPage = function (page) {\n  if (page === null) {\n    this.initWorker();\n    this.onstop();\n  } else {\n    this.ondataavailable(page);\n  }\n};\n\n// Callback Handlers\nRecorder.prototype.ondataavailable = function () {};\nRecorder.prototype.onpause = function () {};\nRecorder.prototype.onresume = function () {};\nRecorder.prototype.onstart = function () {};\nRecorder.prototype.onstop = function () {};\n\nexports.default = Recorder;\n\n//# sourceURL=webpack:///./src/recorder.js?");

/***/ })

/******/ });