"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/UncannyRd/index.html","c95c51357fa8770bf42f7d6e8426e56e"],["/UncannyRd/static/css/main.0613c09d.css","2ee02493d57692c0f32c07f08806126d"],["/UncannyRd/static/js/main.a7d523b1.js","1f81f5b78751541ddce300c90b377623"],["/UncannyRd/static/media/add.77582b38.svg","77582b385e32241224f25b1556dc2f25"],["/UncannyRd/static/media/bentonsans-light-webfont.7e3c248d.woff","7e3c248d63d524001c379ddd0e862075"],["/UncannyRd/static/media/bentonsans-medium-webfont.81085bdf.woff","81085bdf97813d8b1f37d485398707f4"],["/UncannyRd/static/media/empty.842cf317.png","842cf317d2158b1736337fcd70142612"],["/UncannyRd/static/media/eye.417af943.svg","417af943f568c2579b332d23aded68cc"],["/UncannyRd/static/media/heroic-condensed-book.bbb5d6d4.ttf","bbb5d6d417f1d24425f98d5afdca13b5"],["/UncannyRd/static/media/heroic-condensed-regular.c1882bf0.ttf","c1882bf0bffdb53075ed83eac1bb0f5f"],["/UncannyRd/static/media/loader.5fe0e55f.gif","5fe0e55f8e19bc4cc3201876dce7b224"],["/UncannyRd/static/media/result.4fe78bcd.jpg","4fe78bcdc8290696b393909456993d09"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,n,t,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),a.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],r=new URL(n,self.location),a=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),a]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),r="index.html";(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,r),n=urlsToCacheKeys.has(t));var a="/UncannyRd/index.html";!n&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(a,self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});