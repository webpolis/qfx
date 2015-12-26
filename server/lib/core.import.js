import * as repositories from '../../lib/repositories/index';

export default function init() {
  // publish
  Meteor.publish('markets.list', () => repositories.markets.find({}));
}
