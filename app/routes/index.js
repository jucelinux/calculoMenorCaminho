// app/routes/index.js
var load = require('express-load');

module.exports = function(app) {
    
    var controller = app.controllers.index;
    
    app.get('/index', controller.index);
    app.get('/', controller.index);
    app.post('/adicionaRota', controller.adicionaRota);
    //app.get('/adicionaRota', controller.adicionaRota);
    app.post('/calculaMenorCaminho', controller.calculaMenorCaminho);
    //app.get('/calculaMenorCaminho', controller.calculaMenorCaminho);
};