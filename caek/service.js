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
    this.lunchCron = new CronJob({
      cronTime: this.lunchTime,
      onTick: () => {
        this.hipchat.notify(this.getSentence());
      },
      start: true
    });

    this.beerCron = new CronJob({
      cronTime: this.beerTime,
      onTick: function() {
        this.hipchat.notify('Oi! Get Chris a beer');
      }.bind(this),
      start: true
    });
  }

  getFood() {
    return _([
      'Burritos',
      'Thai',
      'Nandos',
      'Cuban Sandwich',
      'Omelette Du Fromage'
    ]).sample();
  }

  getSentence() {
    const food = this.getFood();
    return _([
      `Go eat some ${food}?`,
      `Go get Chris some ${food}?`,
      `Do you know what time it is? Its ${food} time`,
      `I can hear Jake's stomach from here... he need some ${food}`
    ]).sample();
  }

  get beerTime() {
    if (process.env.NODE_ENV === 'staging') {
      return '00 * * * * *'; // Every minute
    }
    return '00 45 16 * * 5'; // 04:45pm, Fri
  }

  get lunchTime() {
    if (process.env.NODE_ENV === 'staging') {
      return '00 * * * * *'; // Every minute
    }
    return '00 45 11 * * 1-5'; // 11:45am, Mon-Fri
  }
}

module.exports = Service;
