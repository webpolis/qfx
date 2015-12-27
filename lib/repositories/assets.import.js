export default assets = new Mongo.Collection('assets');

Meteor.startup(() => {
  if (Meteor.isServer) {
    assets._ensureIndex({
      name: 1,
      ticker: 1
    }, {
      unique: 1
    });
  }
});
