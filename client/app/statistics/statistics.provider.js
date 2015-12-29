angular
  .module('app.statistics.services', ['app'])
  .provider('statisticsSvc', statisticsPvd);

function statisticsPvd() {
  var subscriptions = {};

  return {
    setSubscriptions: function(endpoints) {
      subscriptions = endpoints;
    },
    $get: statisticsSvc
  };

  function statisticsSvc() {
    return {
      init: function(context = null) {
        if (context != null) {
          context.subscribe(subscriptions.list);
          context.subscribe(subscriptions.force.minmax);
        }
      },
      list: function(conditions = {}) {
        return Repositories.statistics.find(conditions);
      },
      minmax: function(type = null) {

      }
    }
  }
}
