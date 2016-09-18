
var npx = require('./lib/npx.js')
//var time = require('./clockface/original.js')
//var time = require('./clockface/original-spectrum.js')
var time = require('./clockface/original-spectrum-fill.js')
var tick = require('./lib/tick.js')
var config = require('./config/config.js')


if (config.USE_NETWORK) {
    var ntp = require('./lib/ntp.js')
    var Network = require('./lib/network.js')
    var network = new Network(config.NETWORK)
}

if (config.USE_ADMIN) {
    var Server = require('./lib/server/')
    var server = new Server(config)
}

if (!config.TESSEL) {
    config.TIMEZONE_OFFSET = 0;
}

var connections = [];

function getTime () {

    var t = new Date((+new Date() + config.NTP_OFFSET));

    t.setHours(t.getHours() + config.TIMEZONE_OFFSET);

    console.log(t)
    return t;
}

function next () {

    time(getTime(), function (buf) {

        connections.forEach(function (con) {
            console.log(con.readyState)
            if (con.readyState == 1) {
                con.send(buf)
            }
        })
        if (config.USE_ADMIN) {
            server.setDisplayBuffer(buf)
        }
        npx.show(
            (config.OUTER + config.INNER),
            buf
        );
    });


    if (config.USE_NETWORK && ntp.shouldUpdate() && network.available()) {
        ntp.update();
    }
}

if (!config.TESSEL) {
    var WebSocketServer = require('ws').Server, 
        wss = new WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(ws) {
        connections.push(ws)
        next()
    });
}

tick.start(next);

if (config.USE_ADMIN) {
    network.on('connected', server.start.bind(server));
    network.on('disconnect', server.disconnect.bind(server));
}

if (config.USE_NETWORK) {
    network.on('connected', ntp.update);
    network.connect();
}