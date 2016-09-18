

var tessel = true;


if (process.env.QTEST) {
    tessel = false;
}

module.exports = {

    USE_ADMIN: false,
    USE_NETWORK: false,

    TESSEL: tessel,
    SERVER_PORT: 8080,
    NTP_OFFSET: 0,
    TIMEZONE_OFFSET: 2,

    OUTER: 58,
    INNER: 56,

    //OUTER_COLOR: [60,126,216], // lila GRB
    //INNER_COLOR: [152,255,0], // sarga GRB

    OUTER_COLOR: [0,255,228], // pink GRB
    INNER_COLOR: [225,53,40], //  zold GRB

    NONE_COLOR: [0,0,0],

    DIM_FROM: 20,
    DIM_TO: 6,
    DIM_VALUE: 0.1,

    INTERVAL: 20000,

    DEMO_COUNTER: 0,

    NETWORK: {
        ssid: 'majesticWLAN',
        password: 'atreides'
    }
}