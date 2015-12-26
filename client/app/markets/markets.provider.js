angular
  .module('app.markets.services', ['app'])
  .provider('marketsSvc', marketsPvd);

function marketsPvd() {
  var subscriptions = {};

  return {
    setSubscriptions: function(endpoints) {
      subscriptions = endpoints;
    },
    $get: marketsSvc
  };

  function marketsSvc() {
    return {
      init: function(context = null) {
        if (context != null) {
          context.subscribe(subscriptions.list);
        }
      }
    }
  }
}
