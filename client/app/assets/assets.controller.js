angular
  .module('app.assets.controllers', ['app', 'app.assets.services'])
  .controller('assetsCtl', assetsCtl);

function assetsCtl($scope, $reactive, assetsSvc) {
  let vm = this;
  let reactiveCtx = $reactive(vm).attach($scope);

  vm.helpers({
    assets: () => {
      return assetsSvc.list({});
    }
  });

  vm.search = search;

  init();

  function init() {
    assetsSvc.init(reactiveCtx);
  }

  function search(value, index, array) {
    if (typeof reactiveCtx.scope.query !== 'undefined' && reactiveCtx.scope.query.length > 0) {
      var re = new RegExp(reactiveCtx.scope.query, 'gi');
      return (re.test(value.name) || re.test(value.ticker));
    }

    return true;
  }
}
