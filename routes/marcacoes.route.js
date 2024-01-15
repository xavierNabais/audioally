const express = require("express");
const router = express.Router();
const MarcacoesController = require("../controller/marcacoes.controller");
var path = require('path');


//Rota Visualização Marcações Frontend
router.get("/marcacoes", MarcacoesController.findAll);

//Rota Formulário Criação Marcações Frontend
router.get("/marcacoes/novo", MarcacoesController.getActive);

//Rota Atualização Marcação Frontend
router.get("/marcacoes/:id/update", (req, res) => {
  const id = req.params.id;
  MarcacoesController.findById(id, res);
});

//Rota Criação Marcação Backend
router.post("/marcacoes/novo", MarcacoesController.create);

//Rota Atualização Marcação Backend
router.post("/marcacoes/:id/update", MarcacoesController.update);

//Rota Eliminação Marcação Backend
router.get("/marcacoes/:id/apagar", MarcacoesController.remove);


module.exports = router;