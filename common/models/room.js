'use strict';

module.exports = function(Room) {
  Room.remoteMethod(
    'isPrivate', {
      http: {
        path: '/isPrivate',
        verb: 'get',
      },
      returns: {
        arg: 'isPrivate',
        type: 'boolean',
      },
    }
  );
};
