angular
  .module('app.statistics.components', ['app', 'app.statistics.services'])
  .directive('statistics', statisticsDtv);

function statisticsDtv() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/statistics/statistics.html',
    controllerAs: 'stats',
    controller: statisticsCtl,
    scope: {
      type: '=',
      asset: '='
    }
  }
}

function statisticsCtl($scope, $reactive, statisticsSvc) {
  let vm = this;
  let reactiveCtx = $reactive(vm).attach($scope);

  vm.helpers({
    currencyForce: () => {
      return statisticsSvc.list({
        type: Models.stat.types.currencyForce
      });
    }
  });

  init();

  function init() {
    statisticsSvc.init(reactiveCtx);
  }
}
