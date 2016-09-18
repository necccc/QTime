var config = require('../config/config.js')
var tick_interval = 0

module.exports = {
    start: start,
    reset: reset,
    run: run
}

function start (next) {

    next();

    run(next);

}

function run (next) {
    tick_interval = setInterval(next, config.INTERVAL)
}

function reset () {
    clearInterval(tick_interval)
}