const express = require("express");
const router = express.Router();
const ProdutorController = require("../controller/produtor.controller");
const isAdmin = require("../middleware/isAdmin.middleware");

var path = require('path');


//Rota Visualização Produtores Frontend
router.get("/produtor",isAdmin, ProdutorController.findAll);

//Rota Formulário Criação Produtor Frontend
router.get("/produtor/novo",isAdmin, function(req,res){
    res.render(path.resolve('views/pages/produtores/create.ejs'));  
})

//Rota Atualização Produtor Frontend
router.get("/produtor/:id/update",isAdmin, (req, res) => {
  const id = req.params.id;
  ProdutorController.findById(id, res);
});

//Rota Criação Produtor Backend
router.post("/produtor/novo",isAdmin, ProdutorController.create);

//Rota Atualização Produtor Backend
router.post("/produtor/:id/update",isAdmin, ProdutorController.update);

//Rota Eliminação Produtor Backend
router.get("/produtor/:id/apagar",isAdmin, ProdutorController.remove);




module.exports = router;