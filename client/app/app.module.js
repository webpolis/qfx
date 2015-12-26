angular
  .module('app', ['angular-meteor', 'accounts.ui', 'app.markets.controllers', 'app.markets.services'])
  .config(config)
  .run(bootstrap);

config.$inject = ['marketsSvcProvider'];

function config(marketsSvcProvider) {
  // subscriptions
  let subscriptions = {
    markets: {
      list: 'markets.list'
    }
  };

  marketsSvcProvider.setSubscriptions(subscriptions.markets);
}

function bootstrap() {

  // init UI
  $(document).ready(function() {
    $('.ui.sidebar').sidebar().sidebar('attach events', '.top.attached.menu .item:first-child');
  });
}
