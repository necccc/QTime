var http = require('http');
var config = require('../config/config.js')

var options = {
        host: 'www.timeapi.org',
        path: '/utc/now',
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.8,hu;q=0.6",
            "Host": "www.timeapi.org",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36"
        }
    };

var updated = 0

function ntpResponse (response) {
    var __data = '';

    response.on('data', function (chunk) {
        __data += chunk;
    });

    response.on('end', function () {
        var date = new Date(__data)

        console.log('setting time', date);

        config.NTP_OFFSET = +date - new Date();

        //process.binding('tm').timestamp_update(date.getTime() * 1000); // conversion

        //updated = +date;
    });
}

function shouldUpdate () {
    return updated + (60*60*1000) < (+new Date());
}

function updateNtp () {
    http.get(options, callback).on('error', function(e) {
        console.error(e);
    });
}

module.exports = {
    update: updateNtp,
    shouldUpdate: shouldUpdate
}