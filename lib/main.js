/*
 * make them available to both client / server
 */
Repositories = null;
Models = null;

Meteor.startup(() => {
  System.import('/lib/repositories/index').then(function(repositories) {
    Repositories = repositories;
  }).catch(err => console.log(err));

  System.import('/lib/models/index').then(function(models) {
    Models = models;
  }).catch(err => console.log(err));
});
