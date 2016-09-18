// major todo: this whole thing


var HttpServer = require('http').Server
var util = require('util');
var fs = require('fs');
var path = require('path');

var Server = function (config) {
    HttpServer.call(this);
    this.config = config;
    this.opened = false;
    this.__cache = {};

    this.on('request', this.__onRequest.bind(this))
    this.on('clientError', this.__onError.bind(this))

}

util.inherits(Server, HttpServer);
module.exports = Server;

Server.prototype.start = function (networkConnection) {
    if (this.opened) return;

    this.__networkConnection = networkConnection;
    console.log(this.__networkConnection)

    this.listen(this.config.SERVER_PORT, this.__networkConnection.ip);
    this.opened = true;
}

Server.prototype.disconnect = function () {
    if (!this.opened) return;

    this.__networkConnection = {};
    this.opened = false;
    this.close();
}

Server.prototype.setDisplayBuffer = function (buf) {
    this.displayBuffer = buf
}

Server.prototype.onRpc = function (request, response) {}

Server.prototype.__onError = function (exception, socket) {
    console.log(exception);
}


Server.prototype.__onRequest = function (request, response) {

console.log(request.url)

    if (/^\/ajax\//.test(request.url)) return this.onRpc(request, response)

    if (this.__cache[request.url]) return response.end(this.__cache[request.url]);

    var f = request.url.replace('/', '');

    if (request.url == '/') {
        f = 'index.html';
    }

     fs.readFile('./web/' + f, this.__serve.bind(this, request, response));
}

Server.prototype.__serve = function (request, response, err, file) {
    if (err) {
        console.log(err);
        response.statusCode = 404;
        return response.end('not found')
    }

    this.__cache[request.url] = file;

    response.end(file)
}



