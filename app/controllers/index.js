// app/controllers/index.js
var dijsktra = require(__base + '/app/util/cmc-dijsktra');
var Firebase = require("firebase");

module.exports = function(){
    var ref = new Firebase("https://malha-rodoviaria.firebaseio.com/");
    
    var mapa = null;
    var origem = null;
    var destino = null;
    var autonomia = null;
    var valorLitro = null;
    
    var controller = {};
    
    controller.index = function(req, res){
        ref.child("malha").on("value", function(snapshot) {
          res.json(snapshot.val());
        });
    };
    
    controller.calculaMenorCaminho = function(req, res){
        
        mapa = req.body.mapa;
        origem = req.body.origem;
        destino = req.body.destino;
        autonomia = req.body.autonomia;
        valorLitro = req.body.valorLitro;
        
        try{
            validaRequisicao(req, false);
            obtemMalha(mapa, res);
        }catch(err){
            res.status(500).send({ mensagem: err });
        }
    };
    
    controller.adicionaRota = function(req, res){ 
        try{
            validaRequisicao(req, true);
            salvaMalha(req.body);
            res.status(200).send({ mensagem: "Malha adicionada com sucesso!" });
        }catch(err){
            res.status(500).send({ mensagem: err });
        }
    };
    
    var obtemMalha = function(mapa, res) {
      ref.child("malha").child(mapa.toLowerCase()).on("value", 
        function(snapshot) {
            calcular(snapshot.val(), res);
        }, 
        function (errorObject) {
          console.log("Falha na leitura dos dados: " + errorObject.code);
      }); 
    };
    
    var calcular = function(malhaRodoviaria, res){
        if(malhaRodoviaria != null){
            var grafo = dijsktra();
            var retorno = grafo.calculaMenorCaminho(malhaRodoviaria, origem, destino, autonomia, valorLitro);
            res.status(200).send({ mensagem: retorno });
        }else{
            res.status(500).send({ mensagem: "Malha não encontrada" });
        }
    };
    
    var salvaMalha = function(malha){
        var mapaObj = {};
        mapaObj[malha.mapa.toLowerCase()] = {"rotas" : malha.rotas};
        ref.child("malha").update(mapaObj);
    };
    
     var validaRequisicao = function(req, adicionaRota){
       if(adicionaRota){
            if(!("mapa" in req.body)){
                throwChaveNaoEncontrada(req, "mapa");
            }else if(!("rotas" in req.body)){
                throwChaveNaoEncontrada(req,"rotas");
            }else{
                var rotas = req.body.rotas;
                for(var i = 0; i < rotas.length; i++){
                    if(!("origem" in rotas[i])){
                        throwChaveNaoEncontrada(req,"origem");
                    }else if(!("destino" in rotas[i])){
                        throwChaveNaoEncontrada(req,"destino");
                    }else if(!("distancia" in rotas[i])){
                        throwChaveNaoEncontrada(req,"distancia");
                    }
                }
            }
       }else{
           if(!("mapa" in req.body)){
                throwChaveNaoEncontrada(req,"mapa");
            }else if(!("origem" in req.body)){
                throwChaveNaoEncontrada(req,"origem");
            }else if(!("destino" in req.body)){
                throwChaveNaoEncontrada(req,"destino");
            }else if(!("autonomia" in req.body)){
                throwChaveNaoEncontrada(req,"autonomia");
            }else if(!("valorLitro" in req.body)){
                throwChaveNaoEncontrada(req,"valorLitro");
            }
       }
   };
   
   var throwChaveNaoEncontrada = function(req, chave){
       throw "Chave '"+ chave +"' não encontrada. Favor consultar página " + req.protocol + '://' + req.host + "/doc para documentação dos serviços!";
   };
   
   var throwMapaNaoEncontrado = function(){
        throw "Mapa não encontrado!";
   };
 
    return controller;
};