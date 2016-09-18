var config = require('../config/config.js')
var dim = require('../lib/util/dim')

module.exports = function clockface_original (date, next) {
    return next(Buffer.concat([
        lightOuter(date),
        lightInner(date)
    ]))
}

function getColor (segment, time) {
    var color = segment == 'outer' ? config.OUTER_COLOR : config.INNER_COLOR;

    if (
        config.DIM_FROM && config.DIM_TO 
        && (time.getHours() > config.DIM_FROM || time.getHours() < config.DIM_TO)
    ) {
        color = dim(config.DIM_VALUE, color)
    }

    return color;

}

function lightOuter (time) {

    var unitsArray = new Array(config.OUTER),
        actual = 0,
        index = 0,
        buf;

//console.log('minutes', time.getMinutes())

    actual = Math.round( ( config.OUTER / 60 ) * time.getMinutes() ) 

    // the 0 is the 28th index on OUTER
    actual = actual + 29

    if (actual >= config.OUTER) {
        actual = actual - config.OUTER
    }

//console.log('minutes actual', actual)

    for (; index < config.OUTER ; index++ ) {
        if (index == actual) {
            buf = new Buffer(getColor('outer', time))
        } else {
            buf = new Buffer(config.NONE_COLOR)
        }
        unitsArray[index] = buf;
    }

    return Buffer.concat(unitsArray)
}


function lightInner (time) {
    var unitsArray = new Array(config.INNER),
        actual = 0,
        hours = time.getHours(),
        minutes = time.getMinutes(),
        index = 0,
        buf;


    if (hours >= 12) {
        hours = hours-12;
    }
    if (hours == 0) {
        hours = 12;
    }

// 4.66


/*


HH      INDEX   INDEXOFFSET
12|0    0       27
1       4       23
2       8       19
3       14      13
4       18      9
5       22      5
6       27      0 (55)
7       32      50
8       36      46
9       41      41
10      46      35
11      50      31

INDEX
Math.round((INNER / 60) * (hours * 5)) - 1

INDEXOFFSET

 = 27 - INDEX

if 27 - INDEX === 0
 = 55

if (27 - INDEX < 0)

 = 55 - (INDEX - 27)


*/

// TODO itt most 6 korul visszafele lepked

//console.log('hour', hours)

    hours = hours + minutes / 60
    actual = Math.round( ( config.INNER / 12 ) * ( hours ) ) -1

//console.log('hour set before offsetting', actual)

    // the 0 is the 27th index on INNER
    if (actual < 27) {
        actual = 27 - actual
    } else if (27 - actual == 0) {
        actual = 55
    } else if (actual > 27 && 27 - actual < 0) {
        actual = config.INNER - 1 - (actual - 27);
    }
    
//console.log('hour offset', actual)

    for (; index < config.INNER; index++ ) {
        if (index == actual) {
            buf = new Buffer(getColor('inner', time))
        } else {
            buf = new Buffer(config.NONE_COLOR)
        }
        unitsArray[index] = buf;
    }

    return Buffer.concat(unitsArray)
}