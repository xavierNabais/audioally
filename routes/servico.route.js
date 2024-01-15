const express = require("express");
const router = express.Router();
const ServicoController = require("../controller/servico.controller");
var path = require('path');


//Rota Visualização Serviços Frontend
router.get("/servicos", ServicoController.findAll);

//Rota Formulário Criação Serviço Frontend
router.get("/servicos/novo", function(req,res){
    res.render(path.resolve('views/pages/servicos/create.ejs'));  
})

//Rota Atualização Serviço Frontend
router.get("/servicos/:id/update", (req, res) => {
    const id = req.params.id;
    ServicoController.findById(id, res);
  });

//Rota Criação Serviço Backend
router.post("/servicos/novo", ServicoController.create);

//Rota Atualização Serviço Backend
router.post("/servicos/:id/update", ServicoController.update);

//Rota Eliminação Serviço Backend
router.get("/servicos/:id/apagar", ServicoController.remove);


module.exports = router;