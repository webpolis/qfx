import * as repositories from '../../lib/repositories/index';
import {
  default as secureRepositories
}
from './security';

import {
  default as statsTask
}
from './tasks/stats';

export default function init() {
  // publish
  Meteor.publish('assets.list', () => repositories.assets.find({
    active: true
  }));

  // run tasks
  SyncedCron.stop();
  let statsTasks = new statsTask('every 5 mins');
  SyncedCron.start();

  // secure repositories
  secureRepositories();
}
