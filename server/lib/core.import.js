import * as repositories from '../../lib/repositories/index';
import {default as secureRepositories} from './security';

export default function init() {
  // publish
  Meteor.publish('assets.list', () => repositories.assets.find({}));

  // secure repositories
  secureRepositories();
}
