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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/_babel-loader@7.1.5@babel-loader/lib/index.js!./src/encoder.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_babel-loader@7.1.5@babel-loader/lib/index.js!./src/encoder.worker.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./src/encoder.worker.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * 用来实现音频流转采样率以及位深的worker方法。\n * TODO: 暂时来说采样率的转写只支持由高转低。不支持由低转高\n */\n(function () {\n  'use strict';\n\n  var recorder = void 0;\n\n  self.onmessage = function (e) {\n    switch (e.data.command) {\n      case 'encode':\n        if (recorder) {\n          recorder.record(e.data.buffers);\n        }\n        break;\n\n      case 'done':\n        if (recorder) {\n          recorder.requestData();\n        }\n        break;\n\n      case 'init':\n        recorder = new WavePCM(e.data);\n        break;\n\n      default:\n      // Ignore any unknown commands and continue recieving commands\n    }\n  };\n\n  var WavePCM = function WavePCM(config) {\n    config = Object.assign({\n      wavBitDepth: 16\n    }, config);\n\n    // if (!config['wavSampleRate']) {\n    //   throw new Error('wavSampleRate value is required to record. NOTE: Audio is not resampled!')\n    // }\n\n    if ([8, 16, 24, 32].indexOf(config.wavBitDepth) === -1) {\n      throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');\n    }\n\n    this.bitDepth = config.wavBitDepth;\n    this.sampleRate = config.wavSampleRate;\n    this.originalSampleRate = config.originalSampleRate;\n    this.recordedBuffers = [];\n    this.bytesPerSample = this.bitDepth / 8;\n  };\n\n  WavePCM.prototype.interleave = function (e) {\n    var t = e.length;\n    this.originalSampleRate += 0.0;\n    this.sampleRate += 0.0;\n    var s = 0;\n    var o = this.originalSampleRate / this.sampleRate;\n    var u = Math.ceil(t * this.sampleRate / this.originalSampleRate);\n    var a = new Float32Array(u);\n    for (var i = 0; i < u; i++) {\n      a[i] = e[Math.floor(s)];\n      s += o;\n    }\n    return a;\n  };\n\n  WavePCM.prototype.record = function (buffers) {\n    buffers = this.interleave(buffers[0]);\n    this.numberOfChannels = this.numberOfChannels || 1;\n    var bufferLength = buffers.length;\n    var reducedData = new Uint8Array(bufferLength * this.numberOfChannels * this.bytesPerSample);\n\n    // Interleave\n    for (var i = 0; i < bufferLength; i++) {\n      for (var channel = 0; channel < this.numberOfChannels; channel++) {\n        var outputIndex = (i * this.numberOfChannels + channel) * this.bytesPerSample;\n\n        // clip the signal if it exceeds [-1, 1]\n        // var sample = Math.max(-1, Math.min(1, buffers[channel][i]))\n        var sample = Math.max(-1, Math.min(1, buffers[i]));\n\n        // bit reduce and convert to integer\n        switch (this.bytesPerSample) {\n          case 4:\n            // 32 bits signed\n            sample = sample * 2147483647.5 - 0.5;\n            reducedData[outputIndex] = sample;\n            reducedData[outputIndex + 1] = sample >> 8;\n            reducedData[outputIndex + 2] = sample >> 16;\n            reducedData[outputIndex + 3] = sample >> 24;\n            break;\n\n          case 3:\n            // 24 bits signed\n            sample = sample * 8388607.5 - 0.5;\n            reducedData[outputIndex] = sample;\n            reducedData[outputIndex + 1] = sample >> 8;\n            reducedData[outputIndex + 2] = sample >> 16;\n            break;\n\n          case 2:\n            // 16 bits signed\n            sample = sample * 32767.5 - 0.5;\n            reducedData[outputIndex] = sample;\n            reducedData[outputIndex + 1] = sample >> 8;\n            break;\n\n          case 1:\n            // 8 bits unsigned\n            reducedData[outputIndex] = (sample + 1) * 127.5;\n            break;\n\n          default:\n            throw new Error('Only 8, 16, 24 and 32 bits per sample are supported');\n        }\n      }\n    }\n\n    self.postMessage({ command: 'buffer', buffer: reducedData });\n    this.recordedBuffers.push(reducedData);\n  };\n\n  WavePCM.prototype.requestData = function () {\n    var bufferLength = this.recordedBuffers[0].length;\n    var dataLength = this.recordedBuffers.length * bufferLength;\n    var headerLength = 44;\n    var wav = new Uint8Array(headerLength + dataLength);\n    var view = new DataView(wav.buffer);\n\n    view.setUint32(0, 1380533830, false); // RIFF identifier 'RIFF'\n    view.setUint32(4, 36 + dataLength, true); // file length minus RIFF identifier length and file description length\n    view.setUint32(8, 1463899717, false); // RIFF type 'WAVE'\n    view.setUint32(12, 1718449184, false); // format chunk identifier 'fmt '\n    view.setUint32(16, 16, true); // format chunk length\n    view.setUint16(20, 1, true); // sample format (raw)\n    view.setUint16(22, this.numberOfChannels, true); // channel count\n    view.setUint32(24, this.sampleRate, true); // sample rate\n    view.setUint32(28, this.sampleRate * this.bytesPerSample * this.numberOfChannels, true); // byte rate (sample rate * block align)\n    view.setUint16(32, this.bytesPerSample * this.numberOfChannels, true); // block align (channel count * bytes per sample)\n    view.setUint16(34, this.bitDepth, true); // bits per sample\n    view.setUint32(36, 1684108385, false); // data chunk identifier 'data'\n    view.setUint32(40, dataLength, true); // data chunk length\n\n    for (var i = 0; i < this.recordedBuffers.length; i++) {\n      wav.set(this.recordedBuffers[i], i * bufferLength + headerLength);\n    }\n\n    self.postMessage({ command: 'wav', data: wav.buffer });\n    self.postMessage(null);\n    self.close();\n  };\n})();\n\n//# sourceURL=webpack:///./src/encoder.worker.js?./node_modules/_babel-loader@7.1.5@babel-loader/lib");

/***/ })

/******/ });