angular
  .module('app.markets.controllers', ['app', 'app.markets.services'])
  .controller('marketsCtl', marketsCtl);

function marketsCtl($scope, $reactive, marketsSvc) {
  const vm = this;
  let reactiveCtx = $reactive(vm).attach($scope);

  init();

  function init() {
    marketsSvc.init(reactiveCtx);
  }
}
