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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code/com/VueApp.js":
/*!********************************!*\
  !*** ./src/code/com/VueApp.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tpls_VueApp_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tpls/VueApp.html */ \"./src/code/tpls/VueApp.html\");\n/* harmony import */ var _tpls_VueApp_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tpls_VueApp_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/code/com/tools.js\");\n\n\n\nconst MIME_TYPE = 'video/webm; codecs=\"opus,vp8\"';\nconst TIME_SLICE = 3000;\n\nconst VueApp = Vue.component(\"vueapp\", {\n    template: _tpls_VueApp_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n    data() {\n        return {\n            recording: false,\n            recordEnded: true,\n            fragmentIndex: 0\n        }\n    },\n    mounted() {\n        this._initApp();\n    },\n\n    methods: {\n        async _initApp() {\n            this._stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});\n            this.$refs.preview.srcObject = this._stream;\n\n            this._mediaRecorder = new MediaRecorder(this._stream, {mimeType: MIME_TYPE});\n            this._mediaRecorder.ondataavailable = this._mediaRecorder_ondataavailableHandler.bind(this);\n\n            let mediaSource = this._mediaSource = new MediaSource();\n            this.$refs.replay.src = URL.createObjectURL(mediaSource);\n            await _tools__WEBPACK_IMPORTED_MODULE_1__[\"default\"].waitForEvent(mediaSource, \"sourceopen\");\n            this._sourceBuffer = mediaSource.addSourceBuffer(MIME_TYPE);\n        },\n\n        async _mediaRecorder_ondataavailableHandler(e) {\n            await _tools__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sleep(TIME_SLICE / 2);\n            this.appendBuffer(await e.data.arrayBuffer());\n\n            this.fragmentIndex++;\n\n            if (this.recording) {\n                this.startRecordProcess();\n            } else {\n                this.recordEnded = true;\n            }\n        },\n\n        startRecordBtnClicked(e) {\n            this.recording = true;\n            this.recordEnded = false;\n\n            this.startRecordProcess();\n        },\n\n        startRecordProcess() {\n            this._timeOffset = 0;\n            this._mediaRecorder.start();\n            this._currentRecordProcessTimerID = setTimeout(() => {\n                this._mediaRecorder.stop();\n            }, TIME_SLICE);\n        },\n\n        stopRecordBtnClicked(e) {\n            this.recording = false;\n        },\n\n        async appendBuffer(arrayBuffer) {\n            this._sourceBuffer.abort();\n            this._sourceBuffer.timestampOffset = this._timeOffset;\n            this._sourceBuffer.appendBuffer(arrayBuffer);\n            await _tools__WEBPACK_IMPORTED_MODULE_1__[\"default\"].waitForEvent(this._sourceBuffer, \"updateend\");\n            this._timeOffset = this._sourceBuffer.buffered.end(this._sourceBuffer.buffered.length - 1);\n        },\n\n        replayTimeupdateHandler(e) {\n            // console.log(e);\n            // console.log(this._mediaSource.readyState);\n        }\n    }\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (VueApp);\n\n//# sourceURL=webpack:///./src/code/com/VueApp.js?");

/***/ }),

/***/ "./src/code/com/tools.js":
/*!*******************************!*\
  !*** ./src/code/com/tools.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst tools = {\n    waitForEvent(target, eventType) {\n        return new Promise(resolve => {\n            let listener = e => {\n                target.removeEventListener(eventType, listener);\n                resolve(e);\n            };\n            target.addEventListener(eventType, listener);\n        });\n    },\n\n    sleep(ms) {\n        return new Promise(resolve => {\n            setTimeout(resolve, ms);\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (tools);\n\n//# sourceURL=webpack:///./src/code/com/tools.js?");

/***/ }),

/***/ "./src/code/main.js":
/*!**************************!*\
  !*** ./src/code/main.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _com_VueApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./com/VueApp */ \"./src/code/com/VueApp.js\");\n\n\ndocument.body.appendChild(new _com_VueApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().$mount(document.createElement(\"div\")).$el);\n\n//# sourceURL=webpack:///./src/code/main.js?");

/***/ }),

/***/ "./src/code/tpls/VueApp.html":
/*!***********************************!*\
  !*** ./src/code/tpls/VueApp.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\n    <div>\\n        <video width=\\\"400\\\" height=\\\"300\\\" autoplay ref=\\\"preview\\\" muted></video>\\n        <video width=\\\"400\\\" height=\\\"300\\\" autoplay ref=\\\"replay\\\" @timeupdate=\\\"replayTimeupdateHandler\\\"></video>\\n    </div>\\n    <div>\\n        <button class=\\\"btn btn-danger\\\" :disabled=\\\"recording||!recordEnded\\\" @click=\\\"startRecordBtnClicked\\\">Record\\n        </button>\\n        <button class=\\\"btn btn-danger\\\" :disabled=\\\"!recording\\\" @click=\\\"stopRecordBtnClicked\\\">Stop</button>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/code/tpls/VueApp.html?");

/***/ })

/******/ });