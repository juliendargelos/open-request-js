class Status {
  constructor(...args) {
    this.set(...args);
  }

  get code() {
    return this._code;
  }

  set code(v) {
    v = parseInt(v);
    this._code = isNaN(v) ? 200 : v;
  }

  get text() {
    return this._text;
  }

  set text(v) {
    this._text = (v + '') || 'Unknown';
  }

  get info() {
    return this.code >= 100 && this.code < 200;
  }

  get success() {
    return this.code >= 200 && this.code < 300;
  }

  get redirection() {
    return this.code >= 300 && this.code < 400;
  }

  get error() {
    return this.code >= 400 || this.code === 0;
  }

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
