const express = require("express");
const router = express.Router();
const MarcacoesController = require("../controller/marcacoes.controller");
const isAdmin = require("../middleware/isAdmin.middleware");
var path = require('path');


//Rota Visualização Marcações Frontend
router.get("/marcacoes",isAdmin, MarcacoesController.findAll);

//Rota Formulário Criação Marcações Frontend
router.get("/marcacoes/novo",isAdmin, MarcacoesController.getActive);

//Rota Atualização Marcação Frontend
router.get("/marcacoes/:id/update", (req, res) => {
  const id = req.params.id;
  MarcacoesController.findById(id, res);
});

//Rota Criação Marcação Backend
router.post("/marcacoes/novo",isAdmin, MarcacoesController.create);

//Rota Atualização Marcação Backend
router.post("/marcacoes/:id/update",isAdmin, MarcacoesController.update);

//Rota Eliminação Marcação Backend
router.get("/marcacoes/:id/apagar",isAdmin, MarcacoesController.remove);


module.exports = router;