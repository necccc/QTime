/**
 * @param {Float} percent
 * @param {Array} color
 */
module.exports = function dim (percent, color) {

// percent: float  0 - 1

    var c = Array.prototype.slice.call(color);

    for (var i = 0 ; i < c.length ; i++) {
        c[i] = Math.round(c[i] * percent)
    }

    return c;

}