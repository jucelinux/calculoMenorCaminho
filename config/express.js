// config/express.js
var express = require('express');
var fs      = require('fs');

module.exports = function() {
    var app = express();
    // variável de ambiente
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
    app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    return app;
};
