const express = require("express");
const router = express.Router();
const ServicoController = require("../controller/servico.controller");
const isAdmin = require("../middleware/isAdmin.middleware");

var path = require('path');


//Rota Visualização Serviços Frontend
router.get("/servicos",isAdmin, ServicoController.findAll);

//Rota Formulário Criação Serviço Frontend
router.get("/servicos/novo",isAdmin, function(req,res){
    res.render(path.resolve('views/pages/servicos/create.ejs'));  
})

//Rota Atualização Serviço Frontend
router.get("/servicos/:id/update",isAdmin, (req, res) => {
    const id = req.params.id;
    ServicoController.findById(id, res);
  });

//Rota Criação Serviço Backend
router.post("/servicos/novo",isAdmin, ServicoController.create);

//Rota Atualização Serviço Backend
router.post("/servicos/:id/update",isAdmin, ServicoController.update);

//Rota Eliminação Serviço Backend
router.get("/servicos/:id/apagar",isAdmin, ServicoController.remove);


module.exports = router;