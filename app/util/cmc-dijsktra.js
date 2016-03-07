module.exports = function(){
	var grafo = new Grafo();
	return grafo;
};
var Grafo = function (){

	var extraiChaves = function (obj) {
		var chaveArr = [], chave;
		for (chave in obj) {
		    Object.prototype.hasOwnProperty.call(obj,chave) && chaveArr.push(chave);
		}
		return chaveArr;
	}

	var comparador = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var descobreCaminhos = function (map, inicio, fim, infinito) {
		infinito = infinito || Infinity;

		var custos = {},
		    noInicial = {'0': [inicio]},
		    predecessores = {},
		    chaveArr;

		var addNoInicial = function (custo, vertice) {
			var chave = "" + custo;
			if (!noInicial[chave]) noInicial[chave] = [];
			noInicial[chave].push(vertice);
		}

		custos[inicio] = 0;

		while (noInicial) {
			if(!(chaveArr = extraiChaves(noInicial)).length) break;

			chaveArr.sort(comparador);

			var chave = chaveArr[0],
			    colecao = noInicial[chave],
			    node = colecao.shift(),
			    custoAtual = parseFloat(chave),
			    nosAdjacentes = map[node] || {};

			if (!colecao.length) delete noInicial[chave];

			for (var vertice in nosAdjacentes) {
			    if (Object.prototype.hasOwnProperty.call(nosAdjacentes, vertice)) {
					var custo = nosAdjacentes[vertice],
					    custoTotal = custo + custoAtual,
					    custoVertice = custos[vertice];

					if ((custoVertice === undefined) || (custoVertice > custoTotal)) {
						custos[vertice] = custoTotal;
						addNoInicial(custoTotal, vertice);
						predecessores[vertice] = node;
					}
				}
			}
		}

		if (custos[fim] === undefined) {
			return null;
		} else {
			return predecessores;
		}

	}

	var extraiMenor = function (predecessores, fim) {
		var nos = [],
		    u = fim;

		while (u) {
			nos.push(u);
			u = predecessores[u];
		}

		nos.reverse();
		return nos;
	}

	var calculaMenorCaminho = function (map, nosInicioFim) {
		var inicio = nosInicioFim.shift(),
		    fim,
		    predecessores,
		    path = [],
		    menor;

		while (nosInicioFim.length) {
			fim = nosInicioFim.shift();
			predecessores = descobreCaminhos(map, inicio, fim);

			if (predecessores) {
				menor = extraiMenor(predecessores, fim);
				if (nosInicioFim.length) {
					path.push.apply(path, menor.slice(0, -1));
				} else {
					return path.concat(menor);
				}
			} else {
				return null;
			}

			inicio = fim;
		}
	}

	var toArray = function (list, offset) {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			var a = [];
			for (var i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}
	
	var criaMap = function(malhaRodoviaria){
	    var map = {};
	    
	    for(var i = 0; i < malhaRodoviaria.rotas.length; i++){
	        var rota = malhaRodoviaria.rotas[i];
	        if(!(rota.origem in map)){
	            map[rota.origem] = {};
	        }
	        if(!(rota.destino in map)){
	            map[rota.destino] = {};
	        }
	    }
	    for(var i = 0; i < malhaRodoviaria.rotas.length; i++){
	            var rota = malhaRodoviaria.rotas[i];
	             map[rota.origem][rota.destino] = rota.distancia;
	             map[rota.destino][rota.origem] = rota.distancia;
	    }
	    
	    return map;
	}
	
	var calculaCusto = function(map, melhorCaminhoArr, autonomia, valorLitro){
		var distanciaTotal = 0;
		for(var i = 1; i < melhorCaminhoArr.length; i++){
			distanciaTotal += map[melhorCaminhoArr[i -1]][melhorCaminhoArr[i]];
		}
		var coeficienteAutonomia = distanciaTotal / autonomia;
		var custo = coeficienteAutonomia * valorLitro;
		return custo;
	}

	this.calculaMenorCaminho = function (malhaRodoviaria, inicio, fim, autonomia, valorLitro) {
		var map = criaMap(malhaRodoviaria);
		var melhorCaminhoArr = calculaMenorCaminho(map, [inicio, fim]);
		var custo = calculaCusto(map,melhorCaminhoArr, autonomia, valorLitro);
		return {rota : melhorCaminhoArr, custo : custo};
	}
};