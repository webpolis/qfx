angular
  .module('app', ['angular-meteor', 'accounts.ui', 'app.assets.controllers', 'app.assets.services'])
  .config(config)
  .run(bootstrap);

config.$inject = ['assetsSvcProvider'];

function config(assetsSvcProvider) {
  // subscriptions
  let subscriptions = {
    assets: {
      list: 'assets.list'
    }
  };

  assetsSvcProvider.setSubscriptions(subscriptions.assets);
}

function bootstrap() {
  // init UI
  $(document).ready(function() {
    $('.ui.sidebar').sidebar().sidebar('attach events', '.top.attached.menu .item:first-child');
  });
}
