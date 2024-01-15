const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");

//configurações
app.set('port', process.env.port || process.env.PORT || 5000);
app.use(express.urlencoded({extended:true}));
app.listen(app.get('port'), () => {
console.log('Servidor iniciado na porta: '+ app.get('port'));
});
app.use(express.static(path.join(__dirname, '/public')));


app.use(cors());

//Definir Rotas Principais
var rotas = require("./routes/main.route");
app.use("/", rotas);

//Definir Rotas Utilizadores
var utilizadores = require("./routes/utilizador.route");
app.use("/", utilizadores);

//Definir Rotas Serviços
var servico = require("./routes/servico.route");
app.use("/", servico);

//Definir Rotas Marcações
var marcacoes = require("./routes/marcacoes.route");
app.use("/", marcacoes);

//Definir Rotas Produtores
var produtor = require("./routes/produtor.route");
app.use("/", produtor);
