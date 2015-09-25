'use strict';

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

const Caek = require('./caek');
const HipChat = require('./hipchat');
const hipchat = new HipChat(process.env.CAEK_ROOM_ID, process.env.CAEK_TOKEN);

new Caek.Service(hipchat);
