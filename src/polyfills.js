// cross-browser-support IE11
if (!window.Promise) {
  require('es6-promise').polyfill();
}

if (!window.fetch) {
  require('isomorphic-fetch');
}
