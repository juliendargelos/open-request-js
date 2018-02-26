class Request {
  static empty(value) {
    return [undefined, null].includes(value);
  }

  /**
   * Sends a request.
   * @param {(string|Url)} url The url of the request.
   * @param {string} [method=get] The request method.
   * @param {(Object|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static send(...args) {
    return (new this(...args)).send();
  }

  /**
   * Sends a get request.
   * @param {(string|Url)} url The url of the request.
   * @param {(Object|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static get(url, data) {
    return this.send(url, 'get', data);
  }

  /**
   * Sends a post request.
   * @param {(string|Url)} url The url of the request.
   * @param {(Object|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static post(url, data) {
    return this.send(url, 'post', data);
  }

  /**
   * Sends put get request.
   * @param {(string|Url)} url The url of the request.
   * @param {(Object|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static put(url, data) {
    return this.send(url, 'put', data);
  }

  /**
   * Sends patch get request.
   * @param {(string|Url)} url The url of the request.
   * @param {(Object|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static patch(url, data) {
    return this.send(url, 'patch', data);
  }

  /**
   * Sends a delete request.
   * @param {(string|Url)} url The url of the request.
   * @param {((Object|Parameters)|Parameters)=} data The data to send.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  static delete(url, data) {
    return this.send(url, 'delete', data);
  }

  /**
   * Creates a {@link Request} object.
   * @param {(string|Url)=} url The url of the request.
   * @param {string} [method=get] The request method.
   * @param {(Object|Parameters)=} data The data to send.
   */
  constructor(url, method, data) {
    if(!(url instanceof Url) && typeof url === 'object' && url !== null) {
      var options = url;
      this.url = options.url;
      this.method = method || options.method;
      this.data = new Parameters(data || options.data);
    }
    else {
      this.url = new Url(url);
      this.method = method;
      this.data = new Parameters(data);
    }
  }

  /**
   * The method of the request. When set it will be checked for being included in 'get', 'post', 'put', 'patch' and 'delete'. If not it will be replaced by 'get'.
   * @type {string}
   */
  get method() {
    return this._method;
  }

  set method(v) {
    v = (v + '').toLowerCase();
    this._method = ['get', 'post', 'put', 'patch', 'delete'].includes(v) ? v : 'get';
  }

  /**
   * The actual method that will be used to send the request (wether 'get' or 'post').
   * @readonly
   * @type {string}
   */
  get actualMethod() {
    return this.method === 'get' ? 'get' : 'post';
  }

  /**
   * The request url.
   * @type {(Url|string)}
   */
  get url() {
    return this._url;
  }

  set url(v) {
    if(v instanceof Url) this._url = v;
    else this._url.string = this.constructor.empty(v) ? '' : v;
  }

  /**
   * The request data. When set it will be parsed to a Parameters object.
   * @type {(Parameters|Object|string)}
   */
  get data() {
    return this._data;
  }

  set data(v) {
    if(v instanceof Parameters) this._data = v;
    else if(typeof v === 'string') this._data.string = this.constructor.empty(v) ? '' : v;
    else this._data.clear().set(v);
  }

  /**
   * Sends the request, merging the given data with the instance data to a new object.
   * @param {(Parameters|Object|string)?} data The data to send, in addition to the instance data.
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
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
            var response = new HttpResponse(xhr.responseText, {code: xhr.status, text: xhr.statusText});
            if(response.status.error) reject(response);
            else resolve(response);
          }
        };

        xhr.onerror = () => reject(new HttpResponse(xhr.responseText, new Status(xhr.status, xhr.statusText)));
        xhr.send(formData);
      }
      catch(e) {
        reject(new HttpResponse(e, {code: 0, text: 'Unable to connect to the server.'}));
      }
    });
  }

  /*
   * Same as setting {@link Request#method} to 'get' then calling {@link Request#send} with <code>data</code>.
   * @param {(Parameters|Object|string)?} data Same as {@link Request#send}'s data argument.
   * @param {}
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  get(data) {
    this.method = 'get';
    return this.send(data);
  }

  /*
   * Same as setting {@link Request#method} to 'post' then calling {@link Request#send} with <code>data</code>.
   * @param {(Parameters|Object|string)?} data Same as {@link Request#send}'s data argument.
   * @param {}
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  post(data) {
    this.method = 'post';
    return this.send(data);
  }

  /*
   * Same as setting {@link Request#method} to 'put' then calling {@link Request#send} with <code>data</code>.
   * @param {(Parameters|Object|string)?} data Same as {@link Request#send}'s data argument.
   * @param {}
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  put(data) {
    this.method = 'put';
    return this.send(data);
  }

  /*
   * Same as setting {@link Request#method} to 'patch' then calling {@link Request#send} with <code>data</code>.
   * @param {(Parameters|Object|string)?} data Same as {@link Request#send}'s data argument.
   * @param {}
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  patch(data) {
    this.method = 'patch';
    return this.send(data);
  }

  /*
   * Same as setting {@link Request#method} to 'delete' then calling {@link Request#send} with <code>data</code>.
   * @param {(Parameters|Object|string)?} data Same as {@link Request#send}'s data argument.
   * @param {}
   * @returns {Promise} A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A {@link HttpResponse} object is always passed.
   */
  delete(data) {
    this.method = 'delete';
    return this.send(data);
  }
}
