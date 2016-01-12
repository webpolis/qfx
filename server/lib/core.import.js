import * as repositories from '../../lib/repositories/index';
import {
  default as secureRepositories
}
from './security';

import * as tasks from './tasks/index';

export default function init() {
  // @todo refactor publishes below; make it part of different module

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
  Meteor.publish('statistics.minmax', function() {
    let self = this;
    let minmax = repositories.statistics.aggregate([{
      $group: {
        _id: '$type',
        min: {
          $min: '$value'
        },
        max: {
          $max: '$value'
        }
      }
    }]);

    for (let s of minmax) {
      self.added('statistics.minmax', s._id, s);
    }

    self.ready();
  });

  Meteor.publish('statistics.avg', function() {
    let self = this;
    let avg = repositories.statistics.aggregate([{
      $group: {
        _id: '$asset',
        avg: {
          $avg: '$value'
        }
      }
    }]);

    let values = avg.map(e => e.avg);
    let min = Math.min(...values);
    let max = Math.max(...values);

    for (let s of avg) {
      s.min = min;
      s.max = max;

      self.added('statistics.avg', s._id, s);
    }

    self.ready();
  });

  // run tasks
  SyncedCron.stop();
  let statsTask = new tasks.statsTask('every 2 mins');
  let etoroTask = new tasks.etoroTask('on the first day of the week');
  let priceTask = new tasks.priceTask('every 1 mins');
  SyncedCron.start();

  // secure repositories
  secureRepositories();
}
