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

/***/ "./node_modules/worker-loader/dist/cjs.js!./src/encoder.worker.js":
/*!************************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./src/encoder.worker.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = function() {\n  return new Worker(__webpack_require__.p + \"357a61ae035c56e83ec7.worker.js\");\n};\n\n//# sourceURL=webpack:///./src/encoder.worker.js?./node_modules/worker-loader/dist/cjs.js");

/***/ }),

/***/ "./src/recorder.js":
/*!*************************!*\
  !*** ./src/recorder.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// 兼容性写法\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar AudioContext = window.AudioContext || window.webkitAudioContext;\nvar WavWorker = __webpack_require__(/*! worker-loader!./encoder.worker.js */ \"./node_modules/worker-loader/dist/cjs.js!./src/encoder.worker.js\");\n\n// Recoder的构造函数\nvar Recorder = function Recorder(config) {\n  if (!Recorder.isRecordingSupported()) {\n    throw new Error('Recording is not supported in this browser');\n  }\n\n  this.state = 'inactive';\n  this.config = Object.assign({\n    bufferLength: 4096, // 每一段buffer的大小\n    encoderApplication: 2049,\n    encoderFrameSize: 20,\n    // encoderPath: './encoder.worker.js', // worker文件的存储位置\n    encoderSampleRate: 48000, // 目标采样率\n    leaveStreamOpen: false,\n    maxBuffersPerPage: 40,\n    mediaTrackConstraints: true,\n    monitorGain: -1, // 创造回声, 这里注意要把值设置为-1才是无声的状态\n    numberOfChannels: 1, // 声道数\n    positionX: 0,\n    positionY: 0,\n    positionZ: 0,\n    recordingGain: 1, // 录音的大小\n    resampleQuality: 3,\n    streamPages: false,\n    wavBitDepth: 16, // 位深\n    recorderFrequency: 1 // 录制音频的频率\n  }, config);\n\n  this.initWorker();\n};\n\n// 静态方法\n// 检查浏览器是否支持使用录音功能\nRecorder.isRecordingSupported = function () {\n  return AudioContext && window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia && window.WebAssembly;\n};\n\n// Instance Methods\nRecorder.prototype.clearStream = function () {\n  if (this.stream) {\n    if (this.stream.getTracks) {\n      this.stream.getTracks().forEach(function (track) {\n        track.stop();\n      });\n    } else {\n      this.stream.stop();\n    }\n\n    delete this.stream;\n  }\n\n  if (this.audioContext) {\n    this.audioContext.close();\n    delete this.audioContext;\n  }\n};\n\nRecorder.prototype.encodeBuffers = function (inputBuffer) {\n  if (this.state === 'recording') {\n    var buffers = [];\n    for (var i = 0; i < inputBuffer.numberOfChannels; i++) {\n      buffers[i] = inputBuffer.getChannelData(i);\n    }\n\n    this.encoder.postMessage({\n      command: 'encode',\n      buffers: buffers\n    });\n  }\n};\n\nRecorder.prototype.initAudioContext = function (sourceNode) {\n  if (sourceNode && sourceNode.context) {\n    this.audioContext = sourceNode.context;\n  }\n\n  if (!this.audioContext) {\n    this.audioContext = new AudioContext();\n  }\n\n  return this.audioContext;\n};\n\nRecorder.prototype.initAudioGraph = function () {\n  var self = this;\n\n  // First buffer can contain old data. Don't encode it.\n  this.encodeBuffers = function () {\n    delete this.encodeBuffers;\n  };\n\n  this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels);\n  this.scriptProcessorNode.connect(this.audioContext.destination);\n  this.scriptProcessorNode.onaudioprocess = function (e) {\n    self.encodeBuffers(e.inputBuffer);\n  };\n\n  this.monitorGainNode = this.audioContext.createGain();\n  this.setMonitorGain(this.config.monitorGain);\n  this.monitorGainNode.connect(this.audioContext.destination);\n\n  // 录音音调\n  this.filterNode = this.audioContext.createBiquadFilter();\n  // - type\n  this.filterNode.type = 'lowshelf';\n  this.setFrequency(this.config.recorderFrequency);\n\n  // 3D环绕效果\n  this.pannerNode = this.audioContext.createPanner();\n  this.setPosition(this.config.positionX, this.config.positionY, this.config.positionZ);\n  this.pannerNode.connect(this.audioContext.destination);\n\n  this.recordingGainNode = this.audioContext.createGain();\n  this.setRecordingGain(this.config.recordingGain);\n  this.recordingGainNode.connect(this.scriptProcessorNode);\n};\n\nRecorder.prototype.initSourceNode = function (sourceNode) {\n  var self = this;\n\n  if (sourceNode && sourceNode.context) {\n    return window.Promise.resolve(sourceNode);\n  }\n\n  if (this.stream && this.sourceNode) {\n    return window.Promise.resolve(this.sourceNode);\n  }\n\n  return window.navigator.mediaDevices.getUserMedia({ audio: this.config.mediaTrackConstraints }).then(function (stream) {\n    self.stream = stream;\n    return self.audioContext.createMediaStreamSource(stream);\n  });\n};\n\nRecorder.prototype.initWorker = function () {\n  var self = this;\n  var streamPage = function streamPage(e) {\n    self.streamPage(e.data);\n  };\n  var storePage = function storePage(e) {\n    self.storePage(e.data);\n  };\n\n  this.recordedPages = [];\n  this.totalLength = 0;\n  this.encoder = new WavWorker();\n  this.encoder.addEventListener('message', this.config.streamPages ? streamPage : storePage);\n};\n\nRecorder.prototype.pause = function () {\n  if (this.state === 'recording') {\n    this.state = 'paused';\n    this.onpause();\n  }\n};\n\nRecorder.prototype.resume = function () {\n  if (this.state === 'paused') {\n    this.state = 'recording';\n    this.onresume();\n  }\n};\n\nRecorder.prototype.setRecordingGain = function (gain) {\n  this.config.recordingGain = gain;\n\n  if (this.recordingGainNode && this.audioContext) {\n    this.recordingGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\n\nRecorder.prototype.setMonitorGain = function (gain) {\n  this.config.monitorGain = gain;\n\n  if (this.monitorGainNode && this.audioContext) {\n    this.monitorGainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);\n  }\n};\n\n// 扩展改变录音音调的方法\nRecorder.prototype.setFrequency = function (frequency) {\n  this.config.filterNode = frequency;\n\n  if (this.filterNode && this.audioContext) {\n    this.filterNode.frequency.value = frequency;\n  }\n};\n\n// 3D环绕效果\nRecorder.prototype.setPosition = function (x, y, z) {\n  this.config.positionX = x;\n  this.config.positionY = y;\n  this.config.positionZ = z;\n\n  if (this.pannerNode && this.audioContext) {\n    this.pannerNode.setPosition(x, y, z);\n  }\n};\n\nRecorder.prototype.start = function (sourceNode) {\n  if (this.state === 'inactive') {\n    var self = this;\n    var config = JSON.parse(JSON.stringify(self.config));\n    this.initAudioContext(sourceNode);\n    this.initAudioGraph();\n\n    return this.initSourceNode(sourceNode).then(function (sourceNode) {\n      self.state = 'recording';\n      self.encoder.postMessage(Object.assign({\n        command: 'init',\n        originalSampleRate: self.audioContext.sampleRate,\n        wavSampleRate: self.audioContext.sampleRate\n      }, config));\n      self.sourceNode = sourceNode;\n      self.sourceNode.connect(self.monitorGainNode);\n      self.sourceNode.connect(self.recordingGainNode);\n      self.sourceNode.connect(self.filterNode); // 挂载音频频率的修改器\n      self.sourceNode.connect(self.pannerNode); // 挂载3d\n      self.onstart(); // 自动开始\n    });\n  }\n};\n\nRecorder.prototype.stop = function () {\n  if (this.state !== 'inactive') {\n    this.state = 'inactive';\n    this.monitorGainNode.disconnect();\n    this.scriptProcessorNode.disconnect();\n    this.recordingGainNode.disconnect();\n    this.sourceNode.disconnect();\n\n    if (!this.config.leaveStreamOpen) {\n      this.clearStream();\n    }\n\n    this.encoder.postMessage({ command: 'done' });\n  }\n};\n\nRecorder.prototype.storePage = function (page) {\n  if (page === null) {\n    var outputData = new Uint8Array(this.totalLength);\n    this.recordedPages.reduce(function (offset, page) {\n      outputData.set(page, offset);\n      return offset + page.length;\n    }, 0);\n\n    this.ondataavailable(outputData);\n    this.initWorker();\n    this.onstop();\n  } else {\n    this.recordedPages.push(page);\n    this.totalLength += page.length;\n  }\n};\n\nRecorder.prototype.streamPage = function (page) {\n  if (page === null) {\n    this.initWorker();\n    this.onstop();\n  } else {\n    this.ondataavailable(page);\n  }\n};\n\n// Callback Handlers\nRecorder.prototype.ondataavailable = function () {};\nRecorder.prototype.onpause = function () {};\nRecorder.prototype.onresume = function () {};\nRecorder.prototype.onstart = function () {};\nRecorder.prototype.onstop = function () {};\n\nexports.default = Recorder;\n\n//# sourceURL=webpack:///./src/recorder.js?");

/***/ })

/******/ });