# Open Request JS 📣
[![npm version](https://badge.fury.io/js/open-request-js.svg)](https://badge.fury.io/js/open-request-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/98eed689838832855d7b/maintainability)](https://codeclimate.com/github/juliendargelos/open-request-js/maintainability)

Simply send http requests.

## Install

```
npm install open-request-js
```

## Usage

```javascript
var Request = require('open-request-js'); // To be used from node.
var Request = require('open-request-js/dist'); // To be used from browser.

var request = new Request('/users/:id?lang=en');

request.url.path.id = 4;
request.url.parameters.lang = 'fr';
request.url.string;
// => "/users/4?lang=fr"

request.send().then(response => console.log(response.json));
```

> Why does the require statement depend on wether it's meant to be use from node or from browser?

Because from node, `Request` needs to require [XMLHttpRequest](https://www.npmjs.com/package/xmlhttprequest) while it already exists in the browser.
By the way, you will not be able to use [`html`](#HttpResponse+html) and [`xml`](#HttpResponse+xml) [`HttpResponse`](#HttpResponse) accessors from node neither because (at the moment) they depend on browser-exclusive APIs.

<a name="Request"></a>

## Request
**Kind**: global class  

* [Request](#Request)
    * [new Request([url], [method], [data])](#new_Request_new)
    * _instance_
        * [.method](#Request+method) : <code>string</code>
        * [.actualMethod](#Request+actualMethod) : <code>string</code>
        * [.url](#Request+url) : <code>Url</code> \| <code>string</code>
        * [.data](#Request+data) : <code>Parameters</code> \| <code>Object</code> \| <code>string</code>
        * [.send(data)](#Request+send) ⇒ <code>Promise</code>
    * _static_
        * [.send(url, [method], [data])](#Request.send) ⇒ <code>Promise</code>
        * [.get(url, [data])](#Request.get) ⇒ <code>Promise</code>
        * [.post(url, [data])](#Request.post) ⇒ <code>Promise</code>
        * [.put(url, [data])](#Request.put) ⇒ <code>Promise</code>
        * [.patch(url, [data])](#Request.patch) ⇒ <code>Promise</code>
        * [.delete(url, [data])](#Request.delete) ⇒ <code>Promise</code>

<a name="new_Request_new"></a>

### new Request([url], [method], [data])
Creates a [Request](#Request) object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> \| <code>Url</code> |  | The url of the request. |
| [method] | <code>string</code> | <code>&quot;\&quot;get\&quot;&quot;</code> | The request method. |
| [data] | <code>Object</code> \| <code>Parameters</code> |  | The data to send. |

<a name="Request+method"></a>

### request.method : <code>string</code>
The method of the request. When set it will be checked for being included in 'get', 'post', 'put', 'patch' and 'delete'. If not it will be replaced by 'get'.

**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+actualMethod"></a>

### request.actualMethod : <code>string</code>
The actual method that will be used to send the request (wether 'get' or 'post').

**Kind**: instance property of [<code>Request</code>](#Request)  
**Read only**: true  
<a name="Request+url"></a>

### request.url : <code>Url</code> \| <code>string</code>
The request url.

**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+data"></a>

### request.data : <code>Parameters</code> \| <code>Object</code> \| <code>string</code>
The request data. When set it will be parsed to a Parameters object.

**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+send"></a>

### request.send(data) ⇒ <code>Promise</code>
Sends the request, merging the given data with the instance data to a new object.

**Kind**: instance method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Parameters</code> \| <code>Object</code> \| <code>string</code> | The data to send, in addition to the instance data. |

<a name="Request.send"></a>

### Request.send(url, [method], [data]) ⇒ <code>Promise</code>
Sends a request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> |  | The url of the request. |
| [method] | <code>string</code> | <code>&quot;\&quot;get\&quot;&quot;</code> | The request method. |
| [data] | <code>Object</code> \| <code>Parameters</code> |  | The data to send. |

<a name="Request.get"></a>

### Request.get(url, [data]) ⇒ <code>Promise</code>
Sends a get request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> | The url of the request. |
| [data] | <code>Object</code> \| <code>Parameters</code> | The data to send. |

<a name="Request.post"></a>

### Request.post(url, [data]) ⇒ <code>Promise</code>
Sends a post request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> | The url of the request. |
| [data] | <code>Object</code> \| <code>Parameters</code> | The data to send. |

<a name="Request.put"></a>

### Request.put(url, [data]) ⇒ <code>Promise</code>
Sends put get request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> | The url of the request. |
| [data] | <code>Object</code> \| <code>Parameters</code> | The data to send. |

<a name="Request.patch"></a>

### Request.patch(url, [data]) ⇒ <code>Promise</code>
Sends patch get request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> | The url of the request. |
| [data] | <code>Object</code> \| <code>Parameters</code> | The data to send. |

<a name="Request.delete"></a>

### Request.delete(url, [data]) ⇒ <code>Promise</code>
Sends a delete request.

**Kind**: static method of [<code>Request</code>](#Request)  
**Returns**: <code>Promise</code> - A promise to resolved when the request finished and succeed, or to be rejected if any error occurs (including http errors). A [HttpResponse](#HttpResponse) object is always passed.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Url</code> | The url of the request. |
| [data] | <code>Object</code> \| <code>Parameters</code> \| <code>Parameters</code> | The data to send. |

<a name="HttpResponse"></a>

## HttpResponse
**Kind**: global class  

* [HttpResponse](#HttpResponse)
    * [new HttpResponse([data], [status])](#new_HttpResponse_new)
    * [.status](#HttpResponse+status) : [<code>Status</code>](#Status) \| <code>Object</code>
    * [.text](#HttpResponse+text) : <code>string</code>
    * [.json](#HttpResponse+json) : <code>Object</code>
    * [.xml](#HttpResponse+xml) : <code>Element</code>
    * [.html](#HttpResponse+html) : <code>Element</code>

<a name="new_HttpResponse_new"></a>

### new HttpResponse([data], [status])
Creates a [HttpResponse](#HttpResponse) object.


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>string</code> | The data of the response. |
| [status] | [<code>Status</code>](#Status) \| <code>Object</code> | The status of the response. |

<a name="HttpResponse+status"></a>

### httpResponse.status : [<code>Status</code>](#Status) \| <code>Object</code>
The response status. When set, it will be parsed to a [Status](#Status) object

**Kind**: instance property of [<code>HttpResponse</code>](#HttpResponse)  
<a name="HttpResponse+text"></a>

### httpResponse.text : <code>string</code>
The response in text format.

**Kind**: instance property of [<code>HttpResponse</code>](#HttpResponse)  
<a name="HttpResponse+json"></a>

### httpResponse.json : <code>Object</code>
The response in json format.

**Kind**: instance property of [<code>HttpResponse</code>](#HttpResponse)  
<a name="HttpResponse+xml"></a>

### httpResponse.xml : <code>Element</code>
The response in XML format.

**Kind**: instance property of [<code>HttpResponse</code>](#HttpResponse)  
<a name="HttpResponse+html"></a>

### httpResponse.html : <code>Element</code>
The response in HTML format.

**Kind**: instance property of [<code>HttpResponse</code>](#HttpResponse)  
<a name="Status"></a>

## Status
**Kind**: global class  

* [Status](#Status)
    * [new Status([code], [text])](#new_Status_new)
    * [.code](#Status+code) : <code>number</code> \| <code>string</code>
    * [.text](#Status+text) : <code>string</code>
    * [.info](#Status+info) : <code>boolean</code>
    * [.success](#Status+success) : <code>boolean</code>
    * [.redirection](#Status+redirection) : <code>boolean</code>
    * [.error](#Status+error) : <code>boolean</code>
    * [.set([code], [text])](#Status+set)

<a name="new_Status_new"></a>

### new Status([code], [text])
Creates a [Status](#Status) object.


| Param | Type | Description |
| --- | --- | --- |
| [code] | <code>number</code> \| <code>string</code> | The code of the response. |
| [text] | <code>string</code> | The text of the response. |

<a name="Status+code"></a>

### status.code : <code>number</code> \| <code>string</code>
The code of the response. When set, it will be parsed to an integer, and set to 0 if it's invalid.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+text"></a>

### status.text : <code>string</code>
The text of the response.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+info"></a>

### status.info : <code>boolean</code>
Tells if this is an info.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+success"></a>

### status.success : <code>boolean</code>
Tells if this is a success.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+redirection"></a>

### status.redirection : <code>boolean</code>
Tells if this is a redirection.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+error"></a>

### status.error : <code>boolean</code>
Tells if this is an error.

**Kind**: instance property of [<code>Status</code>](#Status)  
<a name="Status+set"></a>

### status.set([code], [text])
Set the status

**Kind**: instance method of [<code>Status</code>](#Status)  

| Param | Type | Description |
| --- | --- | --- |
| [code] | <code>number</code> \| <code>string</code> | The code of the response. |
| [text] | <code>string</code> | The text of the response. |

## Classes

<dl>
<dt><a href="#Request">Request</a></dt>
<dd></dd>
<dt><a href="#HttpResponse">HttpResponse</a></dt>
<dd></dd>
<dt><a href="#Status">Status</a></dt>
<dd></dd>
</dl>

