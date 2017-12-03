class Request {
  constructor() {
    try {
      if(typeof require !== 'function') require = function() {};
    }
    catch(e) {
      var require = function() {};
    }
    if(!Parameters) Parameters = require('parameters-js');
    if(!Url) Url = require('open-url-js');
  }
}

if(typeof module !== 'object' || module === null) module = {};
module.exports = Request;
