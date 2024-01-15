const express = require("express");
const router = express.Router();
const ProdutorController = require("../controller/produtor.controller");
var path = require('path');


//Rota Visualização Produtores Frontend
router.get("/produtor", ProdutorController.findAll);

//Rota Formulário Criação Produtor Frontend
router.get("/produtor/novo", function(req,res){
    res.render(path.resolve('views/pages/produtores/create.ejs'));  
})

//Rota Atualização Produtor Frontend
router.get("/produtor/:id/update", (req, res) => {
  const id = req.params.id;
  ProdutorController.findById(id, res);
});

//Rota Criação Produtor Backend
router.post("/produtor/novo", ProdutorController.create);

//Rota Atualização Produtor Backend
router.post("/produtor/:id/update", ProdutorController.update);

//Rota Eliminação Produtor Backend
router.get("/produtor/:id/apagar", ProdutorController.remove);




module.exports = router;