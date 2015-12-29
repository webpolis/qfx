angular
  .module('app.statistics.components', ['app', 'app.statistics.services'])
  .directive('statistics', statisticsDtv)
  .directive('heat', statisticsHeatDtv);

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

function statisticsHeatDtv() {
  return {
    restrict: 'E',
    template: '<span class="heat-box">&nbsp;</span><span class="heat-box">&nbsp;</span><span class="heat-box">&nbsp;</span><span class="heat-box">&nbsp;</span><span class="heat-box">&nbsp;</span>',
    scope: {
      stat: '='
    },
    link: function link($scope, $element, $attrs) {
      $('.heat-box', $element).heatcolor(() => scale($scope.stat.avg, [$scope.stat.min, $scope.stat.max], [1, 100]), {
        maxval: 100,
        minval: 1,
        colorStyle: 'greentored',
        lightness: 0
      });

      function scale(value, r1, r2) {
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
      }
    }
  }
}

function statisticsCtl($scope, $reactive, $timeout, statisticsSvc) {
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
