import * as repositories from '../../lib/repositories/index';

export default function init() {
  // secure repositories
  repositories.assets.deny({
    update: function(userId, doc, fields, modifier) {
      return true;
    },
    insert: function(userId, doc) {
      return true;
    },
    remove: function(userId, doc) {
      return true;
    }
  })
}
