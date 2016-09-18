

var config = require('../config/config.js')

if (config.TESSEL) {
    var Neopixels = require('neopixels');
    var neopixels = new Neopixels();
} else {
    var neopixels = {animate: function () {}, on: function () {}}
}



neopixels.on('end', function () {
   // console.log('neopx ended')
})


module.exports = {
    show: show,
    clear: clear
}

function show (pixels, data) {
    neopixels.animate(pixels, data);
}

function clear () {
    var buf = new Buffer((config.OUTER + config.INNER) * 3);
    buf.fill(0)
    neopixels.animate((config.INNER + config.OUTER), buf);
}
