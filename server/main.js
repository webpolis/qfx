// initialize core
System.import('/server/lib/core').then(function(core) {
  let init = core.default;
  init();
}).catch(err => console.log(err));
