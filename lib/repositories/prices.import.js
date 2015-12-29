export default prices = new Mongo.Collection('prices');

Meteor.startup(() => {
  if (Meteor.isServer) {
    prices._ensureIndex({
      ref: 1
    }, {
      unique: 1
    });
  }
});
