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
          context.subscribe(subscriptions.minmax);
          context.subscribe(subscriptions.avg);
        }
      },
      list: function(conditions = {}) {
        return Repositories.statistics.find(conditions);
      },
      minmax: function() {
        let collection = Meteor.Collection.get(subscriptions.minmax) || new Meteor.Collection(subscriptions.minmax);

        return collection.find({});
      },
      avg: function() {
        let collection = Meteor.Collection.get(subscriptions.avg) || new Meteor.Collection(subscriptions.avg);

        return collection.find({});
      }
    }
  }
}
