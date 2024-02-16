const express = require("express");
const router = express.Router();
const UtilizadorController = require("../controller/utilizador.controller");
const isAdmin = require("../middleware/isAdmin.middleware");
var path = require('path');


//Rota Listagem Utilizadores Frontend
router.get("/utilizadores", isAdmin, UtilizadorController.findAll);

//Rota Formulário Criação Utilizador Frontend
router.get("/utilizadores/novo", function(req,res){
    res.render(path.resolve('views/pages/utilizadores/create.ejs'));  
})

//Rota Formulário Atualizar Utilizador Frontend
router.get("/utilizadores/:id/update", (req, res) => {
    const id = req.params.id;
    UtilizadorController.findById(id, res);
  });

//Rota Atualização Utilizador Backend
router.post("/utilizadores/:id/update", UtilizadorController.update);

//Rota Criação Utilizador Backend
router.post("/utilizadores/novo", UtilizadorController.create);

//Rota Eliminar Utilizador Backend
router.get("/utilizadores/:id/apagar", UtilizadorController.remove);


module.exports = router;