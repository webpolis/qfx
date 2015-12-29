import * as repositories from '../../lib/repositories/index';
import {
  default as secureRepositories
}
from './security';

import * as tasks from './tasks/index';

export default function init() {
  // publish collections
  Meteor.publish('assets.list', () => repositories.assets.find({
    active: true,
    type: {
      $in: ['cross']
    }
  }));

  Meteor.publish('statistics.list', () => repositories.statistics.find({}));
  Meteor.publish('prices.list', () => repositories.prices.find({}));

  // some stats
  Meteor.publish('statistics.force.minmax', function() {
    let self = this;
    let minmax = repositories.statistics.aggregate([{
      $group: {
        _id: null,
        min: {
          $min: '$value'
        },
        max: {
          $max: '$value'
        }
      }
    }]);

    for (let s of minmax) {
      self.added('statistics.force.minmax', s._id, s);
    }

    self.ready();
  });

  // run tasks
  SyncedCron.stop();
  let statsTask = new tasks.statsTask('every 10 mins');
  let etoroTask = new tasks.etoroTask('on the first day of the week');
  let priceTask = new tasks.priceTask('every 1 mins');
  SyncedCron.start();

  // secure repositories
  secureRepositories();
}
