angular
  .module('app.assets.controllers', ['app', 'app.assets.services'])
  .controller('assetsCtl', assetsCtl);

function assetsCtl($scope, $reactive, assetsSvc) {
  const vm = this;
  let reactiveCtx = $reactive(vm).attach($scope);

  init();

  function init() {
    assetsSvc.init(reactiveCtx);
  }
}
