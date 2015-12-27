export default statistics = new Mongo.Collection('statistics');

Meteor.startup(() => {
  if (Meteor.isServer) {
    statistics._ensureIndex({
      period: 1,
      type: 1,
      asset: 1
    }, {
      unique: 1
    });
  }
});
