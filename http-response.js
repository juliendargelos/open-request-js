var Status = require('./status.js');

module.exports = class HttpResponse {

  /**
   * Creates a {@link HttpResponse} object.
   * @param {string=} data The data of the response.
   * @param {(Status|Object)=} status The status of the response.
   */
  constructor(data, status) {
    this.data = data;
    this.status = new Status(status);
  }

  /**
   * The response status. When set, it will be parsed to a {@link Status} object
   * @type {(Status|Object)}
   */
  get status() {
    return this._status;
  }

  set status(v) {
    if(v instanceof Status) this._status = v;
    else this._status.set(v);
  }

  /**
   * The response in text format.
   * @type {string}
   */
  get text() {
    return this.data;
  }

  /**
   * The response in json format.
   * @type {Object}
   */
  get json() {
    try {
      return JSON.parse(this.data);
    }
    catch(e) {
      return {};
    }
  }

  /**
   * The response in XML format.
   * @type {Element}
   */
  get xml() {
    try {
      return (new DOMParser()).parseFromString(this.data, 'text/xml');
    }
    catch(e) {
      return new DocumentFragment();
    }
  }

  /**
   * The response in HTML format.
   * @type {Element}
   */
  get html() {
    try {
      return (new DOMParser()).parseFromString(this.data, 'text/html');
    }
    catch(e) {
      return new DocumentFragment();
    }
  }
}
