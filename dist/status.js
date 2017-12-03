class Status {
  constructor(code, text) {
    this.code = parseInt(code) || 200;
    this.text = text;
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
    this._text = v + '';
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
}
