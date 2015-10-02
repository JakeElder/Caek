'use strict';

const CronJob = require('cron').CronJob;
const _ = require('underscore');

class Service {
  constructor(hipchat) {
    this.hipchat = hipchat;
    this.startCron();
    console.log('Starting up');
  }

  startCron() {
    this.cron = new CronJob({
      cronTime: this.cronTime,
      onTick: function() {
        const food = this.getFood().toUpperCase();
        this.hipchat.notify(`${food}?`);
      }.bind(this),
      start: true
    });
  }

  getFood() {
    return _([
      'Burritos',
      'Thai',
      'Nandos',
      'Omelette Du Fromage'
    ]).sample();
  }

  get cronTime() {
    if (process.env.NODE_ENV === 'staging') {
      return '00 * * * * *'; // Every minute
    }
    return '00 45 11 * * 1-5'; // 11:45am, Mon-Fri
  }
}

module.exports = Service;
