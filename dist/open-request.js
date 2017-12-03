class Request {
  static empty(value) {
    return [undefined, null].includes(value);
  }

  static send(...args) {
    return (new this(...args)).send();
  }

  static get(url, data) {
    return this.send(url, 'get', data);
  }

  static post(url, data) {
    return this.send(url, 'post', data);
  }

  static put(url, data) {
    return this.send(url, 'put', data);
  }

  static patch(url, data) {
    return this.send(url, 'patch', data);
  }

  static delete(url, data) {
    return this.send(url, 'delete', data);
  }

  constructor(url, method, data) {
    if(!(url instanceof Url) && typeof url === 'object' && url !== null) {
      var options = url;
      url = options.url;
      if(arguments.length < 2) method = options.method;
      if(arguments.length < 3) data = options.data;
    }

    this.url = new Url(url);
    this.method = method;
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
    var url = this.url.string;
    var method = this.actualMethod;
    var formData = method === 'get' ? null : this.data.clone.set(data).set({_method: this.method}).formData;

    return new Promise((resolve, reject) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4) {
            var response = new HttpResponse(xhr.responseText);
            response.status = new Status(xhr.status, xhr.statusText);

            if(response.status.error) reject(response);
            else resolve(response);
          }
        };

        xhr.onerror = function() {
          var response = new HttpResponse(xhr.responseText);
          response.status = new Status(xhr.status, xhr.statusText);

          reject(response);
        };

        xhr.send(formData);
      }
      catch(e) {
        try {
          var response = new HttpResponse(e);
          response.status = new Status(0, 'Unable to connect to the server.');
        }
        catch(e) {}
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
