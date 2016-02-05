#!/bin/env node
//  OpenShift sample Node application
var app = require('./config/express')();




app.listen(app.get('port'), app.get('ip'), function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), app.get('ip'),app.get('port'));
});


