// if (!self.define) {
//   let e,
//     s = {};
//   const a = (a, i) => (
//     (a = new URL(a + ".js", i).href),
//     s[a] ||
//       new Promise((s) => {
//         if ("document" in self) {
//           const e = document.createElement("script");
//           (e.src = a), (e.onload = s), document.head.appendChild(e);
//         } else (e = a), importScripts(a), s();
//       }).then(() => {
//         let e = s[a];
//         if (!e) throw new Error(`Module ${a} didn’t register its module`);
//         return e;
//       })
//   );
//   self.define = (i, n) => {
//     const t =
//       e ||
//       ("document" in self ? document.currentScript.src : "") ||
//       location.href;
//     if (s[t]) return;
//     let c = {};
//     const r = (e) => a(e, t),
//       o = { module: { uri: t }, exports: c, require: r };
//     s[t] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (n(...e), c));
//   };
// }
// define(["./workbox-4d767a27"], function (e) {
//   "use strict";
//   importScripts(),
//     self.skipWaiting(),
//     e.clientsClaim(),
//     e.precacheAndRoute(
//       [
//         {
//           url: "/_next/app-build-manifest.json",
//           revision: "238e240a855e0de4aad874a908a832b8",
//         },
//         {
//           url: "/_next/static/ZYqaSDdw0yGjaymTMCsQZ/_buildManifest.js",
//           revision: "ef91103b3fbb0edee87133f87bfcd031",
//         },
//         {
//           url: "/_next/static/ZYqaSDdw0yGjaymTMCsQZ/_ssgManifest.js",
//           revision: "b6652df95db52feb4daf4eca35380933",
//         },
//         {
//           url: "/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",
//           revision: "2b4c1ee4fbe3a7cf",
//         },
//         {
//           url: "/_next/static/chunks/218.57a830a2c55ba802.js",
//           revision: "57a830a2c55ba802",
//         },
//         {
//           url: "/_next/static/chunks/226-9cb4d1ca1b76a4c6.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/4bd1b696-7ca2760f8db741a1.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/517-c962dbd6763f6dec.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/572-75c81fcd9aa5ca11.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/601-effdd01e73781a34.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/608-1d769ef4930a752b.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/742-062c1b95c08de003.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/808-07af5c2b487e0cfa.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/_not-found/page-cf561b08769316e0.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/login/route-7fac2602648dedd2.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/logout/route-19e7e10dc15f0e4f.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/me/route-2a7389263fb746ac.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/refresh/route-46b02e3279a7c828.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/resetpassword/route-e5935e35d37a8d0b.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/sendemail/route-ef16cbd3b6cd4bb3.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/api/auth/signup/route-f3cd07f2fa9182c0.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/archive/page-b7527e3b914e44e3.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/layout-9f5a52bfa4825bd8.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/login/page-fe28b012e7a45ae3.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/page-308988544e672802.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/setting/page-154bacdaf6611ee6.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/app/user/page-f27f714cec9cf006.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/framework-6b27c2b7aa38af2d.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/main-9705031bf708db1a.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/main-app-c55932a23de12cfc.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/pages/_app-430fec730128923e.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
//           revision: "846118c33b2c0e922d7b3a7676f81f6f",
//         },
//         {
//           url: "/_next/static/chunks/webpack-9ec865d929fa84c6.js",
//           revision: "ZYqaSDdw0yGjaymTMCsQZ",
//         },
//         {
//           url: "/_next/static/css/24060e97c2e8484c.css",
//           revision: "24060e97c2e8484c",
//         },
//         {
//           url: "/_next/static/css/a138e0bfb9293ee2.css",
//           revision: "a138e0bfb9293ee2",
//         },
//         {
//           url: "/_next/static/css/d09e1249a59d1cce.css",
//           revision: "d09e1249a59d1cce",
//         },
//         {
//           url: "/_next/static/css/ef46db3751d8e999.css",
//           revision: "ef46db3751d8e999",
//         },
//         {
//           url: "/fonts/Vazir-Bold.eot",
//           revision: "e920eb9db5b099ffe6756fb6484b4d4f",
//         },
//         {
//           url: "/fonts/Vazir-Bold.ttf",
//           revision: "e5dd55b99484565a6737631963bf6fe7",
//         },
//         {
//           url: "/fonts/Vazir-Bold.woff",
//           revision: "c30ca73f8138de861354a0392d301754",
//         },
//         {
//           url: "/fonts/Vazir-Bold.woff2",
//           revision: "692cbbcec64ca2930da01b9c27d4838f",
//         },
//         {
//           url: "/fonts/Vazir-Regular.eot",
//           revision: "29d45ab94f47a40e00b25ded9a13be9e",
//         },
//         {
//           url: "/fonts/Vazir-Regular.ttf",
//           revision: "ea8cfea19e17fec2f5a76a76aaf23860",
//         },
//         {
//           url: "/fonts/Vazir-Regular.woff",
//           revision: "8f0fd8df2a133734f662bb29ce2cb100",
//         },
//         {
//           url: "/fonts/Vazir-Regular.woff2",
//           revision: "e49586a216ddb4f438de8201300f3d43",
//         },
//         { url: "/icons/6.svg", revision: "53c270940c830d36cdaaa081accd0323" },
//         { url: "/images/1.svg", revision: "12518658ffeb8952d2c3322a1812407c" },
//         { url: "/images/2.svg", revision: "34cb621aa013e2942a00bf870d6af856" },
//         { url: "/images/4.svg", revision: "5ff98c3b203f704f9221d87c0e65fec2" },
//         { url: "/images/5.svg", revision: "08e4180713a1467a5fd7abc7f727e73f" },
//         { url: "/images/6.svg", revision: "53c270940c830d36cdaaa081accd0323" },
//         { url: "/images/7.svg", revision: "37c5ceb6565122668d550dc26d92a433" },
//         { url: "/manifest.json", revision: "2468a183c537ef7465431c4023410bd7" },
//       ],
//       { ignoreURLParametersMatching: [] }
//     ),
//     e.cleanupOutdatedCaches(),
//     e.registerRoute(
//       "/",
//       new e.NetworkFirst({
//         cacheName: "start-url",
//         plugins: [
//           {
//             cacheWillUpdate: async ({
//               request: e,
//               response: s,
//               event: a,
//               state: i,
//             }) =>
//               s && "opaqueredirect" === s.type
//                 ? new Response(s.body, {
//                     status: 200,
//                     statusText: "OK",
//                     headers: s.headers,
//                   })
//                 : s,
//           },
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
//       new e.CacheFirst({
//         cacheName: "google-fonts-webfonts",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "google-fonts-stylesheets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "static-font-assets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "static-image-assets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\/_next\/image\?url=.+$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "next-image",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:mp3|wav|ogg)$/i,
//       new e.CacheFirst({
//         cacheName: "static-audio-assets",
//         plugins: [
//           new e.RangeRequestsPlugin(),
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:mp4)$/i,
//       new e.CacheFirst({
//         cacheName: "static-video-assets",
//         plugins: [
//           new e.RangeRequestsPlugin(),
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:js)$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "static-js-assets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:css|less)$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "static-style-assets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\/_next\/data\/.+\/.+\.json$/i,
//       new e.StaleWhileRevalidate({
//         cacheName: "next-data",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       /\.(?:json|xml|csv)$/i,
//       new e.NetworkFirst({
//         cacheName: "static-data-assets",
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       ({ url: e }) => {
//         if (!(self.origin === e.origin)) return !1;
//         const s = e.pathname;
//         return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
//       },
//       new e.NetworkFirst({
//         cacheName: "apis",
//         networkTimeoutSeconds: 10,
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       ({ url: e }) => {
//         if (!(self.origin === e.origin)) return !1;
//         return !e.pathname.startsWith("/api/");
//       },
//       new e.NetworkFirst({
//         cacheName: "others",
//         networkTimeoutSeconds: 10,
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
//         ],
//       }),
//       "GET"
//     ),
//     e.registerRoute(
//       ({ url: e }) => !(self.origin === e.origin),
//       new e.NetworkFirst({
//         cacheName: "cross-origin",
//         networkTimeoutSeconds: 10,
//         plugins: [
//           new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
//         ],
//       }),
//       "GET"
//     );
// });
