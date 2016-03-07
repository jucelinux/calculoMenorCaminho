// config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
    // variável de ambiente
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
    app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')())
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
  
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    
    return app;
};
