var config = require('../config/config.js')
var util = require('util');
var EventEmitter = require('events').EventEmitter;

if (config.TESSEL) {
    var wifi = require('wifi-cc3000');
} else {
    var wifi = require('./util/wifi-mock');
}
var Network = function (config) {
    EventEmitter.call(this);
    this.config = config;

    wifi.on(this.events.CONNECT, this.__connected.bind(this))
    wifi.on(this.events.ERROR, this.__reconnect.bind(this, this.events.ERROR))
    wifi.on(this.events.DISCONNECT, this.__reconnect.bind(this, this.events.DISCONNECT))
    wifi.on(this.events.TIMEOUT, this.__reconnect.bind(this, this.events.TIMEOUT))
}

util.inherits(Network, EventEmitter);

Network.prototype.events = {
    CONNECT: 'connect',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    TIMEOUT: 'timeout'
}

Network.prototype.available = function () {
    return wifi.isConnected();
}

Network.prototype.connect = function () {
    if (wifi.isConnected()) return;

    if (!wifi.isBusy()) {
        wifi.connect(this.config)
    } else {
        setTimeout(this.connect.bind(this), 10000);
    }
}

Network.prototype.reconnect = function () {
    wifi.reset(this.connect.bind(this))
}

Network.prototype.__reconnect = function (event, err) {
    console.log('network reconnecting', event, err)
    this.emit('disconnect')
    this.connect();
}

Network.prototype.__connected = function (res) {
    this.emit('connected', res)
}




module.exports = Network;





