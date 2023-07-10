# Calculo de menor caminho para malhas rodoviárias

## Motivação
Esta aplicação foi desenvolvida para resolver o problema proposto no processo seletivo do Walmart:
>Sua tarefa será desenvolver o novo sistema de entregas visando sempre o menor custo. Para popular sua base de dados o sistema precisa expor um Webservices que aceite o formato de malha logística (exemplo abaixo), nesta mesma requisição o requisitante deverá informar um nome para este mapa. É importante que os mapas sejam persistidos para evitar que a cada novo deploy todas as informações desapareçam. O formato de malha logística é bastante simples, cada linha mostra uma rota: ponto de origem, ponto de destino e distância entre os pontos em quilômetros.
>Com os mapas carregados o requisitante irá procurar o menor valor de entrega e seu caminho, para isso ele passará o mapa, nome do ponto de origem, nome do ponto de destino, autonomia do caminhão (km/l) e o valor do litro do combustivel, agora sua tarefa é criar este Webservices. Um exemplo de entrada seria, mapa SP, origem A, destino D, autonomia 10, valor do litro 2,50; a resposta seria a rota A B D com custo de 6,25.

### Tecnologias envolvidas

* [node.js] - plataforma backend voltada para desenvolvimento de aplicações orientadas a evento e sem bloqueio de I/O;
* [Express] - Framework de integração com recursos de rede para nodejs;
* [firebase] - repositório de armazenamento de dados no formato JSON;
* [openshift] - Serviço de hospedagem em nuvem 'container-based' para aplicações web;
* [cloud9] - IDE online para desenvolvimento e integração em múltiplas linguagens e plataformas ;



>A aplicação também possui uma implementação do algoritmo de Dijkstra desenvolvida por mim em javascript. Tal algoritmo permite o calculo de menor caminho para grafos orientados e não-orientados. 

### Orientação de uso

A aplicação expõe 2 métodos:
 - Adicionar rota;
 - Calcular melhor caminho;

Ambos os métodos são do tipo POST e esperam um JSON no corpo da requisição. Abaixo, um exemplo do JSON que deverá ser enviado na requisição
** **
**Adicionar rota:**

http://bytecode-jucelinux.rhcloud.com/adicionaRota
```JSON
{
	"mapa":"mg",
	"rotas":[	{"origem":"A","destino":"B","distancia":10},
				{"origem":"B","destino":"D","distancia":15},
				{"origem":"A","destino":"C","distancia":20},
				{"origem":"C","destino":"D","distancia":30},
				{"origem":"B","destino":"E","distancia":50},
				{"origem":"D","destino":"E","distancia":30}
			]
}
```


** **
**Calcular melhor caminho:**

http://bytecode-jucelinux.rhcloud.com/calculaMenorCaminho
```JSON
{
	"mapa":"mg",
	"origem":"A",
	"destino":"D",
	"autonomia":10,
	"valorLitro":2.5
}
```
**Retornos**

* Exemplo de rota calculada com êxito:
```JSON
{
    "mensagem": {
        "rota": ["A", "B", "D"],
        "custo": 6.25
    }
}
```
* Exemplo de malha adicionada com êxito
```JSON
{
    "mensagem": "Malha adicionada com sucesso!"
}
```
* Exemplo de mensagem de erro (Seguida de um status 500)
```JSON
{
    "mensagem": "Malha não encontrada"
}
```
** **


### Todos

 - Testes unitários
 - Implementação das chamadas GET
 - Dormir mais =/



**Free Software, Hell Yeah!**
