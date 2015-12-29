import * as repositories from '../../lib/repositories/index';

export default function init() {
  let denyAll = {
    update: function(userId, doc, fields, modifier) {
      return !Meteor.isServer;
    },
    insert: function(userId, doc) {
      return !Meteor.isServer;
    },
    remove: function(userId, doc) {
      return !Meteor.isServer;
    }
  };

  // secure repositories
  repositories.assets.deny(denyAll);
  repositories.statistics.deny(denyAll);
  repositories.prices.deny(denyAll);
}
