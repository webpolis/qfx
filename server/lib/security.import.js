import * as repositories from '../../lib/repositories/index';

export default function init() {
  let denyAll = {
    update: function(userId, doc, fields, modifier) {
      return true;
    },
    insert: function(userId, doc) {
      return true;
    },
    remove: function(userId, doc) {
      return true;
    }
  };

  // secure repositories
  repositories.assets.deny(denyAll);
  repositories.statistics.deny(denyAll);
}
