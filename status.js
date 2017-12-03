module.exports = class Status {

  /**
   * Creates a {@link Status} object.
   * @param {(number|string)=} code The code of the response.
   * @param {string=} text The text of the response.
   */
  constructor(...args) {
    this.set(...args);
  }

  /**
   * The code of the response. When set, it will be parsed to an integer, and set to 0 if it's invalid.
   * @type {(number|string)}
   */
  get code() {
    return this._code;
  }

  set code(v) {
    v = parseInt(v);
    this._code = isNaN(v) ? 200 : v;
  }

  /**
   * The text of the response.
   * @type {string}
   */
  get text() {
    return this._text;
  }

  set text(v) {
    this._text = (v + '') || 'Unknown';
  }

  /**
   * Tells if this is an info.
   * @type {boolean}
   */
  get info() {
    return this.code >= 100 && this.code < 200;
  }

  /**
   * Tells if this is a success.
   * @type {boolean}
   */
  get success() {
    return this.code >= 200 && this.code < 300;
  }

  /**
   * Tells if this is a redirection.
   * @type {boolean}
   */
  get redirection() {
    return this.code >= 300 && this.code < 400;
  }

  /**
   * Tells if this is an error.
   * @type {boolean}
   */
  get error() {
    return this.code >= 400 || this.code === 0;
  }

  /**
   * Set the status
   * @param {(number|string)=} code The code of the response.
   * @param {string=} text The text of the response.
   */
  set(code, text) {
    if(typeof code === 'object') {
      var options = code;
      code = options.code;
      if(arguments.length < 2) text = options.text;
    }

    this.code = code;
    this.text = text;
  }
}
