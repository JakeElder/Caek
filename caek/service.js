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
        this.hipchat.notify('INITIALIZING FOOD RECOMMENDATION ENGINE...');
        setTimeout(() => {
          this.hipchat.notify('ANALYZING USER PREFERENCES BASED ON CHAT HISTORY...');
        }, 10 * 1000);
        setTimeout(() => {
          this.hipchat.notify('GATHERING INFORMATION FROM SOCIAL MEDIA...');
        }, 20 * 1000);
        setTimeout(() => {
          this.hipchat.notify('taking a quick break');
        }, 30 * 1000);
        setTimeout(() => {
          this.hipchat.notify('COMPILING A LIST OF POSSIBLE VENUES BASED ON LOCATION...');
        }, 40 * 1000);
        setTimeout(() => {
          this.hipchat.notify('WEIGHTING CHOICES BASED ON PREFERENCE, PROXIMITY AND WEATHER CONDITIONS...');
        }, 50 * 1000);
        setTimeout(() => {
          this.hipchat.notify('DISREGARDING COLLECTED DATA AND SELECTING FOOD RANDOMLY BASED ON A LIST OF THREE DIFFERENT THINGS...');
        }, 60 * 1000);
        setTimeout(() => {
          this.hipchat.notify(`${food}?`);
        }, 70 * 1000);
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

  get cronTime() {
    if (process.env.NODE_ENV === 'staging') {
      return '00 * * * * *'; // Every minute
    }
    return '00 45 11 * * 1-5'; // 11:45am, Mon-Fri
  }
}

module.exports = Service;
