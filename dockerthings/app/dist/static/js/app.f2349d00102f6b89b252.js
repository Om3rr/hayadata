webpackJsonp([1],{"+GGk":function(e,t,n){"use strict";var r=n("zIVT");function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},"/VWB":function(e,t,n){"use strict";var r=n("RlDD");function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},"0l+G":function(e,t,n){"use strict";var r=n("obgR");e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},"1/oy":function(e,t){},"1DmB":function(e,t,n){"use strict";var r=n("zIVT");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},"4nb4":function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},"5aBc":function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),s="",a=0,u=r;i.charAt(0|a)||(u="=",a%1);s+=u.charAt(63&t>>8-a%1*8)){if((n=i.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return s}},"7LYE":function(e,t,n){"use strict";var r=n("zIVT"),o=n("wZW9"),i=n("RS1v"),s=n("9T8H"),a=n("1DmB"),u=n("0l+G"),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n("5aBc");e.exports=function(e){return new Promise(function(t,f){var l=e.data,p=e.headers;r.isFormData(l)&&delete p["Content-Type"];var d=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in d||a(e.url)||(d=new window.XDomainRequest,h="onload",m=!0,d.onprogress=function(){},d.ontimeout=function(){}),e.auth){var v=e.auth.username||"",y=e.auth.password||"";p.Authorization="Basic "+c(v+":"+y)}if(d.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d[h]=function(){if(d&&(4===d.readyState||m)&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?s(d.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:1223===d.status?204:d.status,statusText:1223===d.status?"No Content":d.statusText,headers:n,config:e,request:d};o(t,f,r),d=null}},d.onerror=function(){f(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var g=n("OhlP"),x=(e.withCredentials||a(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;x&&(p[e.xsrfHeaderName]=x)}if("setRequestHeader"in d&&r.forEach(p,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),f(e),d=null)}),void 0===l&&(l=null),d.send(l)})}},"9M+g":function(e,t){},"9RB6":function(e,t,n){"use strict";var r=n("T2kP"),o=n("zIVT"),i=n("+GGk"),s=n("U2+V");function a(e){this.defaults=e,this.interceptors={request:new i,response:new i}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},"9T8H":function(e,t,n){"use strict";var r=n("zIVT"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},BHmv:function(e,t){},BTlr:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},C9l1:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},ElYB:function(e,t){},"Ex+b":function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},GfHa:function(e,t){},HXpE:function(e,t,n){"use strict";var r=n("zIVT"),o=n("4nb4"),i=n("9RB6"),s=n("T2kP");function a(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var u=a(s);u.Axios=i,u.create=function(e){return a(r.merge(s,e))},u.Cancel=n("RlDD"),u.CancelToken=n("/VWB"),u.isCancel=n("C9l1"),u.all=function(e){return Promise.all(e)},u.spread=n("Kbjq"),e.exports=u,e.exports.default=u},Id91:function(e,t){},Jmt5:function(e,t){},Kbjq:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},MDdG:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},o,!1,function(e){n("vGjf")},null,null).exports,s=n("/ocq"),a=n("Xxa5"),u=n.n(a),c=n("exGp"),f=n.n(c),l=n("IhTM"),p={name:"query-control",props:["query"],data:function(){return{search:"D529811",purpose:"",purpose_slider:500,mechanism:"",mechanism_slider:500,slider_range:[{label:"Somewhat Similar"},{label:"Very Similar"}],radio_vals:[{txt:"Don`t care",v:0},{txt:"Similiar",v:1},{txt:"Dissimiliar",v:2}],tried:!1}},computed:{invalidFeedback:function(){if(1!==this.purpose&&1!==this.mechanism)return"At least one of the parameters should be similar"},state:function(){return!this.tried}},methods:{enter:function(){this.tried=!0,this.invalidFeedback||this.$parent.queryMultiple(this.search,this.mechanism,this.purpose,this.mechanism_slider,this.purpose_slider)},setKey:function(e){this.search=e}},components:{VueSlideBar:n.n(l).a}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-form-group",{attrs:{"invalid-feedback":e.invalidFeedback,description:"Let us know your name.",label:"Enter your name",state:e.state,"label-for":"input1"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.enter(t):null}}},[n("b-form-input",{attrs:{id:"input1",type:"text",placeholder:"Enter patent id"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"flex"},[e._v("\n      Purpose\n      "),n("div",{staticClass:"checkboxes"},[n("b-form-radio-group",{staticClass:"scontainer",attrs:{name:"radioSubComponent"},model:{value:e.purpose,callback:function(t){e.purpose=t},expression:"purpose"}},e._l(e.radio_vals,function(t){return n("b-form-radio",{attrs:{value:t.v}},[e._v(e._s(t.txt))])}))],1),e._v(" "),1===e.purpose?n("div",{staticClass:"slider"},[n("vue-slide-bar",{attrs:{range:e.slider_range,min:100,max:1e3},model:{value:e.purpose_slider,callback:function(t){e.purpose_slider=t},expression:"purpose_slider"}})],1):e._e()]),e._v(" "),n("div",{staticClass:"flex"},[e._v("\n      Mechanism\n      "),n("div",{staticClass:"checkboxes"},[n("b-form-radio-group",{staticClass:"scontainer",attrs:{name:"radioSubComponent2"},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.radio_vals,function(t){return n("b-form-radio",{attrs:{value:t.v}},[e._v(e._s(t.txt))])}))],1),e._v(" "),1===e.mechanism?n("div",{staticClass:"slider"},[n("vue-slide-bar",{attrs:{range:e.slider_range,min:100,max:1e3},model:{value:e.mechanism_slider,callback:function(t){e.mechanism_slider=t},expression:"mechanism_slider"}})],1):e._e()])]),e._v(" "),n("div",{staticClass:"button-container"},[n("b-button",{staticClass:"button",attrs:{variant:"primary"},on:{click:e.enter}},[e._v("GOGOGOGO")])],1)],1)},staticRenderFns:[]};var h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"container"},[t("h2",{staticClass:"title"},[t("span",[this._v("LOADING...")])])])}]};var m={components:{QueryControl:n("VU/8")(p,d,!1,function(e){n("MDdG")},"data-v-a80f0346",null).exports,MyLoader:n("VU/8")({name:"my-loader"},h,!1,function(e){n("BHmv")},"data-v-10ab062a",null).exports},name:"HelloWorld",data:function(){return{articles:[],currentArticle:null,state:"abstract",qq:null,loading:!1}},mounted:function(){this.query()},methods:{saveArticleKey:function(e){this.$refs.query.setKey(e)},query:function(){var e=this;return f()(u.a.mark(function t(){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$api.get_all_articles();case 2:n=t.sent,e.articles=e.chunk(n.data,3);case 4:case"end":return t.stop()}},t,e)}))()},queryArticle:function(e){var t=this;return f()(u.a.mark(function n(){var r;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$api.queryArticle(e,t.state);case 2:r=n.sent,t.articles=t.chunk(r.data,3),t.currentArticle=e;case 5:case"end":return n.stop()}},n,t)}))()},queryMultiple:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1e3;return f()(u.a.mark(function s(){var a;return u.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return r.loading=!0,s.next=3,r.$api.queryMultiple({idx:e,mechanism:{state:t,slider:o},purpose:{state:n,slider:i}});case 3:a=s.sent,r.articles=r.chunk(a.data,3),r.currentArticle=e,setTimeout(function(){return r.loading=!1},2e3);case 7:case"end":return s.stop()}},s,r)}))()},chunk:function(e,t){for(var n=[],r=0,o=e.length;r<o;r+=t)n.push(e.slice(r,r+t));return n}}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"header"},[n("query-control",{ref:"query",attrs:{query:e.qq}})],1),e._v(" "),e._l(e.articles,function(t,r){return n("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],key:r},[n("b-card-group",{staticClass:"mb-3",attrs:{deck:""}},e._l(t,function(t){return n("b-card",{key:t.index,staticClass:"clickable",class:t.key===e.currentArticle?"marked":"",attrs:{title:t.title},on:{click:function(n){e.saveArticleKey(t.key)}}},[n("blockquote",{staticClass:"blockquote mb-0"},[n("p",[e._v(e._s(t.abstract))])]),e._v(" "),t.distance?n("p",[e._v(e._s(t.distance))]):e._e()])}))],1)})],2)},staticRenderFns:[]};var y=n("VU/8")(m,v,!1,function(e){n("b1Z6")},"data-v-30b25c82",null).exports;r.a.use(s.a);var g=new s.a({routes:[{path:"/",name:"Testish",component:y}]}),x=n("uj17"),b=n.n(x),w={install:function(e,t){var n={get_all_articles:function(){return b.a.get("/api/articles")},queryArticle:function(e,t){var n={article:e,state:t};return b.a.get("/api/query",{params:n})},queryMultiple:function(e){return b.a.get("/api/multiple",{params:e})}};e.prototype.$api=n}},_=n("e6fC"),C=n("preX");n("ElYB"),n("Jmt5"),n("9M+g");r.a.config.productionTip=!1,r.a.use(w),r.a.use(C.a),r.a.use(_.a),new r.a({el:"#app",router:g,components:{App:i},template:"<App/>"})},OhlP:function(e,t,n){"use strict";var r=n("zIVT");e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},RS1v:function(e,t,n){"use strict";var r=n("zIVT");function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},RlDD:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},T2kP:function(e,t,n){"use strict";(function(t){var r=n("zIVT"),o=n("TOXd"),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,u={adapter:("undefined"!=typeof XMLHttpRequest?a=n("7LYE"):void 0!==t&&(a=n("7LYE")),a),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){u.headers[e]={}}),r.forEach(["post","put","patch"],function(e){u.headers[e]=r.merge(i)}),e.exports=u}).call(t,n("W2nU"))},TOXd:function(e,t,n){"use strict";var r=n("zIVT");e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},"U2+V":function(e,t,n){"use strict";var r=n("zIVT"),o=n("i7gz"),i=n("C9l1"),s=n("T2kP"),a=n("Ex+b"),u=n("BTlr");function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!a(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},ZH5x:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},b1Z6:function(e,t){},i7gz:function(e,t,n){"use strict";var r=n("zIVT");e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},obgR:function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},uj17:function(e,t,n){e.exports=n("HXpE")},vGjf:function(e,t){},wZW9:function(e,t,n){"use strict";var r=n("0l+G");e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},zIVT:function(e,t,n){"use strict";var r=n("4nb4"),o=n("ZH5x"),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f2349d00102f6b89b252.js.map