'use strict';

var CronJob = require('cron').CronJob;
var _ = require('underscore');

class Service {
  constructor(hipchat) {
    this.hipchat = hipchat;
    this.startCron();
    this.hipchat.notify('STARTING THE FUCK UP');
  }

  startCron() {
    this.cron = new CronJob({
      // 11:45am, Mon-Fri
      cronTime: '00 45 11 * * 1-5',
      onTick: function() {
        this.hipchat.notify('GO EAT SOME FUCKING ' + this.getFood());
      }.bind(this),
      start: true
    });
  }

  getFood() {
    return _([
      'Burritos',
      'Thai',
      'Nandos'
    ]).sample();
  }
}

module.exports = Service;
