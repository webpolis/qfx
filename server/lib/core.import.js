import * as repositories from '../../lib/repositories/index';

export default function init() {
  // publish
  Meteor.publish('assets.list', () => repositories.assets.find({}));
}
