angular
  .module('app.assets.services', ['app'])
  .provider('assetsSvc', assetsPvd);

function assetsPvd() {
  var subscriptions = {};

  return {
    setSubscriptions: function(endpoints) {
      subscriptions = endpoints;
    },
    $get: assetsSvc
  };

  function assetsSvc() {
    return {
      init: function(context = null) {
        if (context != null) {
          context.subscribe(subscriptions.list);
        }
      }
    }
  }
}
