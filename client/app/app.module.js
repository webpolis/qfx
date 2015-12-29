angular
  .module('app', ['angular-meteor', 'accounts.ui', 'app.assets.controllers', 'app.assets.services', 'app.statistics.components', 'app.statistics.services'])
  .config(config)
  .run(bootstrap);

config.$inject = ['assetsSvcProvider', 'statisticsSvcProvider'];

function config(assetsSvcProvider, statisticsSvcProvider) {
  // subscriptions
  let subscriptions = {
    assets: {
      list: 'assets.list'
    },
    statistics: {
      list: 'statistics.list',
      force: {
        minmax: 'statistics.force.minmax'
      }
    }
  };

  assetsSvcProvider.setSubscriptions(subscriptions.assets);
  statisticsSvcProvider.setSubscriptions(subscriptions.statistics);
}

function bootstrap() {
  // init UI
  $(document).ready(function() {
    $('.ui.sidebar').sidebar().sidebar('attach events', '.top.attached.menu .item:first-child');
  });
}
