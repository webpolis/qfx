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
    force: () => {
      return statisticsSvc.list({
        type: Models.stat.types.force
      });
    },
    minmax: () => {
      return statisticsSvc.minmax();
    },
    avg: () => {
      return statisticsSvc.avg();
    }
  });

  init();

  function init() {
    statisticsSvc.init(reactiveCtx);
  }
}
