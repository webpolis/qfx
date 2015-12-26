// setup auth
ServiceConfiguration.configurations.remove({
  service: 'google'
});
ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: '666297497417-a8flqhsvue7neaaf9it7bs88jiqn9n84.apps.googleusercontent.com',
  loginStyle: 'popup',
  secret: 'ZUAUq39tHS5VX6m2PfbZ5ZyV'
});
