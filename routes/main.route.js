    const express = require('express');
    const router = express.Router();
    var path = require('path');
    const loginController = require("../controller/login.controller");
    const registoController = require("../controller/registo.controller");
    const clienteController = require("../controller/cliente.controller");
    const MarcacoesController = require("../controller/marcacoes.controller");



    //Rota Visualização Página Login Frontend
    router.get("/", async function(req,res){
        res.render(path.resolve('views/pages/login.ejs'));  
    });

    //Rota Visualização Página Registo Frontend
    router.get("/register", async function(req,res){
        res.render(path.resolve('views/pages/register.ejs'));  
    });

    //Rota Visualização Marcações Frontend
    router.get("/cliente/marcacoes/:id", clienteController.getMarcacoesOfClient);

    //Rota Sucesso Marcação Cliente Frontend
    router.get("/cliente/sucesso/:id", async function(req,res){
        const utilizador = req.params.id;
        res.render(path.resolve('views/pages/clientes/sucesso.ejs'), { utilizador: utilizador });  
    });

    //Rota Formulário Marcação Cliente Frontend
    router.get("/cliente/formulario/:id", clienteController.getMarcacoesOfClient);

    //Rota Verificação Login Cliente Backend
    router.post("/", loginController.getUser);

    //Rota Registo Utilizador Backend
    router.post("/register", registoController.create);

    //Rota Criação Marcação Cliente Backend
    router.post("/cliente/formulario/:id", clienteController.create);

module.exports = router;