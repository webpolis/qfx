import * as repositories from '../../lib/repositories/index';
import {
  default as secureRepositories
}
from './security';

import * as tasks from './tasks/index';

export default function init() {
  // publish
  Meteor.publish('assets.list', () => repositories.assets.find({
    active: true
  }));
  Meteor.publish('statistics.list', () => repositories.statistics.find({}));

  // run tasks
  SyncedCron.stop();
  let statsTask = new tasks.statsTask('every 5 mins');
  let etoroTask = new tasks.etoroTask('on the first day of the week');
  SyncedCron.start();

  // secure repositories
  secureRepositories();
}
