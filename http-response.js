var Status = require('./status.js');

module.exports = class HttpResponse {
  constructor(data, status) {
    this.data = data;
    this.status = new Status(status);
  }

  get status() {
    return this._status;
  }

  set status(v) {
    if(v instanceof Status) this._status = v;
    else this._status.set(v);
  }

  get text() {
    return this.data;
  }

  get json() {
    try {
      return JSON.parse(this.data);
    }
    catch(e) {
      return {};
    }
  }

  get xml() {
    try {
      return (new DOMParser()).parseFromString(this.data, 'text/xml');
    }
    catch(e) {
      return new DocumentFragment();
    }
  }

  get html() {
    try {
      return (new DOMParser()).parseFromString(this.data, 'text/html');
    }
    catch(e) {
      return new DocumentFragment();
    }
  }
}
