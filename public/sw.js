if(!self.define){let e,a={};const s=(s,t)=>(s=new URL(s+".js",t).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let n={};const f=e=>s(e,c),d={module:{uri:c},exports:n,require:f};a[c]=Promise.all(t.map((e=>d[e]||f(e)))).then((e=>(i(...e),n)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"9d9b14f804a5e5550abb87ea545131a2"},{url:"/_next/static/6foq0TEFdaATetaTuefW9/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/6foq0TEFdaATetaTuefW9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1-31e5f7cb56beb4eb.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/23-82de7b1e70f94d4b.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/320-37570a035be1a9f9.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/361-fca7257367f6696c.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/41ade5dc-0102e199bf26e038.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/648-7828feb06a07f192.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/854-f7e8c1f0ded688f6.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/_not-found/page-7b09a88f825f0f8d.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/enviar/page-6b88037a80aa1493.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/layout-602271ac474f1e9e.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/lista/page-f834c98ac4a5b734.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/listas/page-7f33c39f59c9c8c7.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/app/page-a09c8ad31ee37069.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/fd9d1056-8444ca715ffd7b9c.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/main-app-552c9cdd772d2d37.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/main-d161e697429d940b.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-702e3a994acc6e2a.js",revision:"6foq0TEFdaATetaTuefW9"},{url:"/_next/static/css/5e27fb3db6892626.css",revision:"5e27fb3db6892626"},{url:"/_next/static/css/bede0c97a35de884.css",revision:"bede0c97a35de884"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/5fb25f343c7550ca-s.woff2",revision:"b1ee7ba0b4c946e20d7859cddf2aa203"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6c9a125e97d835e1-s.woff2",revision:"889718d692d5bfc6019cbdfcb5cc106f"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/7ede3623c9ddac57-s.woff2",revision:"352bd40859f4f3744377e2ad51836740"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a1386beebedccca4-s.woff2",revision:"d3aa06d13d3cf9c0558927051f3cb948"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/arrow-click.7f64fd8f.png",revision:"efa21f6cfc25aa087ec2edf6703d0b03"},{url:"/_next/static/media/b8442747db2a9bad-s.woff2",revision:"bdb143282b9fa3a5da7f074b6f81e124"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/boxicons.043adf59.woff2",revision:"043adf59"},{url:"/_next/static/media/boxicons.30e3c4d3.ttf",revision:"30e3c4d3"},{url:"/_next/static/media/boxicons.6b4a75b1.svg",revision:"6b4a75b1"},{url:"/_next/static/media/boxicons.ea5a983e.woff",revision:"ea5a983e"},{url:"/_next/static/media/boxicons.f36b6848.eot",revision:"f36b6848"},{url:"/_next/static/media/c3bc380753a8436c-s.woff2",revision:"5a1b7c983a9dc0a87a2ff138e07ae822"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f10b8e9d91f3edcb-s.woff2",revision:"63af7d5e18e585fad8d0220e5d551da1"},{url:"/_next/static/media/f54d3b402c212b9e-s.woff2",revision:"07771519abf754f445a139aedac251dc"},{url:"/_next/static/media/fe0777f1195381cb-s.woff2",revision:"f2a04185547c36abfa589651236a9849"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/web-app-manifest-192x192.png",revision:"67adad89bd55e91debe9afa1fd32ed60"},{url:"/web-app-manifest-512x512.png",revision:"9094796c01338a348ddd6e818aad6769"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:t})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
