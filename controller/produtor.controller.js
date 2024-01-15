const ProdutorModel = require("../model/produtor.model.js");
var path = require('path');

//Controller Procurar Produtores
exports.findAll = (req, res) => {
    ProdutorModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos produtores"
        });
        else res.render(path.resolve('views/pages/produtores/index.ejs'), { dados });   

    });
};

//Controller Criar Novo Produtor
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const produtor = new ProdutorModel ({
        nome: req.body.nome,
        nif: req.body.nif,
        especializacao: req.body.especializacao,
        ativo: req.body.ativo

    });
    ProdutorModel.create(produtor, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar um produtor."
        });
        else
        ProdutorModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados dos produtores"
            });
            else res.render(path.resolve('views/pages/produtores/index.ejs'), { dados });   
        });
    });
};

//Controller Atualizar Produtor
exports.update = (req, res) => {
    ProdutorModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do produtor"
        });
        else res.redirect('/produtor');

    });
};

//Controller Eliminar Produtores
exports.remove = (req, res) => {
    const id= req.params.id
    ProdutorModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do produtor"
        });
        else res.redirect('/produtor');

    });
};

//Controller Procurar ID Produtor
exports.findById = (req, res) => {
    ProdutorModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do produtor"
        });
        else res.render(path.resolve('views/pages/produtores/update.ejs'), { dados });      

    });
};