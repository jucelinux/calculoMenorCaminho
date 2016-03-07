#!/bin/env node
//  OpenShift sample Node 
global.__base = __dirname + '/';

var app = require('./config/express')();

app.listen(app.get('port'), app.get('ip'), function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), app.get('ip'),app.get('port'));
});


