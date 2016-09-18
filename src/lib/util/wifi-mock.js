var util = require('util');
var EventEmitter = require('events').EventEmitter;

var WifiMock = function () {
    EventEmitter.call(this);

    this.connected = false;
}

util.inherits(WifiMock, EventEmitter);



WifiMock.prototype.isConnected = function () {
    return this.connected;
}

WifiMock.prototype.isBusy = function () {
    return false;
}

WifiMock.prototype.connect = function () {
    setTimeout(this.__connected.bind(this), 400)
    return;
}

WifiMock.prototype.reset = function () {
    return;
}

WifiMock.prototype.__connected = function () {
    this.emit('connect', {ip: '0.0.0.0'})
}

module.exports = new WifiMock();