'use strict';

const request = require('request');

class HipChat {
  constructor(roomId, authToken) {
    this.roomId = roomId;
    this.authToken = authToken;
  }

  notify(message) {
    request({
      url: 'https://api.hipchat.com/v2/room/' + this.roomId + '/notification?auth_token=' + this.authToken,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: {
        color: 'green',
        notify: true,
        message_format: 'html',
        message: message
      },
    }, function (error) {
      if (!error) {
        console.log('Successfully published to hipchat');
      } else {
        console.error(error);
      }
    });
  }
}

module.exports = HipChat;
