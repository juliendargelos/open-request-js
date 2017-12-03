class Request {
  static empty(value) {
    return [undefined, null].includes(value);
  }

  static send(...args) {
    return (new this(...args)).send();
  }

  static get(url, data, format) {
    return this.send(url, 'get', data, format);
  }

  static post(url, data, format) {
    return this.send(url, 'post', data, format);
  }

  static put(url, data, format) {
    return this.send(url, 'put', data, format);
  }

  static patch(url, data, format) {
    return this.send(url, 'patch', data, format);
  }

  static delete(url, data, format) {
    return this.send(url, 'delete', data, format);
  }

  constructor(url, method, data, format) {
    if(!(url instanceof Url) && typeof url === 'object' && url !== null) {
      var options = url;
      url = options.url;
      if(arguments.length < 2) method = options.method;
      if(arguments.length < 3) data = options.data;
      if(arguments.length < 4) format = options.format;
    }

    this.url = new Url(url);
    this.method = method;
    this.format = format;
    this.data = new Parameters(data);
  }

  get method() {
    return this._method;
  }

  set method(v) {
    v = (v + '').toLowerCase();
    this._method = ['get', 'post', 'put', 'patch', 'delete'].includes(v) ? v : 'get';
  }

  get actualMethod() {
    return this.method === 'get' ? 'get' : 'post';
  }

  get format() {
    return this._format;
  }

  set format(v) {
    v = (v + '').toLowerCase();
    this._format = ['json', 'text', 'xml'].includes(v) ? v : 'json';
  }

  get url() {
    return this._url;
  }

  set url(v) {
    if(v instanceof Url) this._url = v;
    else this._url.string = this.constructor.empty(v) ? '' : v;
  }

  get data() {
    return this._data;
  }

  set data(v) {
    if(v instanceof Parameters) this._data = v;
    else if(typeof v === 'string') this._data.string = this.constructor.empty(v) ? '' : v;
    else this._data.clear().set(v);
  }

  send(data) {
    var format = this.format;
    var url = this.url.string;
    var method = this.actualMethod;
    var formData = method === 'get' ? null : this.data.clone.set(data).set({_method: this.method}).formData;

    return new Promise((resolve, reject) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open(url, method);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4) {
            var status = new Status(xhr.statusCode, xhr.statusText);

            if(status.error) reject(this.constructor[format](xhr.responseText), status);
            else resolve(this.constructor[format](xhr.responseText), status);
          }
        };
        xhr.send(formData);
      }
      catch(e) {
        reject(e, new Status(0, 'Unable to connect to the server.'));
      }
    });
  }

  get(data) {
    this.method = 'get';
    return this.send(data);
  }

  post(data) {
    this.method = 'post';
    return this.send(data);
  }

  put(data) {
    this.method = 'put';
    return this.send(data);
  }

  patch(data) {
    this.method = 'patch';
    return this.send(data);
  }

  delete(data) {
    this.method = 'delete';
    return this.send(data);
  }
}
