!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).actionQueue={})}(this,(function(e){"use strict";e.ActionQueue=class{queue=[];config;constructor(e){this.config=Object.assign(this.defaultConfig,e)}get defaultConfig(){return{maxSize:10,beforeHook:null}}pushAction(e){if("function"!=typeof this.config.beforeHook)this.__pushAction(e);else{let t=this.config.beforeHook(e);t?this.__pushAction(t):this.__pushAction(e)}}__pushAction(e){this.queue.length>=this.config.maxSize&&this.queue.shift(),this.queue.push(e)}getActions(){return[...this.queue]}}}));
