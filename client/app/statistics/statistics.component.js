angular
  .module('app.statistics.components', ['app', 'app.statistics.services'])
  .directive('statistics', statisticsDtv);

function statisticsDtv() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/statistics/statistics.html',
    controllerAs: 'stats',
    controller: statisticsCtl
  }
}

function statisticsCtl($scope, $reactive, statisticsSvc) {
  let vm = this;
  let reactiveCtx = $reactive(vm).attach($scope);

  vm.helpers({
    currencyForce: () => {
      return statisticsSvc.list({
        type: 'currencyForce'
      });
    }
  })

  init();

  function init() {
    statisticsSvc.init(reactiveCtx);
  }
}