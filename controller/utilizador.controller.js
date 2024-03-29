const UtilizadorModel = require("../model/utilizador.model.js");
var path = require('path');

//Controller Procurar Utilizadores
exports.findAll = (req, res) => {
    UtilizadorModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
        });
        else res.render(path.resolve('views/pages/utilizadores/index.ejs'), { dados });   

    });
};

//Controller Criar Utilizador
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }
    const dataOriginal = req.body.data;

    // Dividir a string em partes usando '/'
    const partesData = dataOriginal.split('/');
    
    // Reorganizar as partes da data e juntá-las usando '-'
    const dataFormatada = `${partesData[2]}-${partesData[0]}-${partesData[1]}`;

    const utilizador = new UtilizadorModel ({
        username: req.body.username,
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        data: dataFormatada,
        sexo: req.body.sexo,
        admin: req.body.admin
    });

    UtilizadorModel.create(utilizador, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar um utilizador."
        });
        else
        UtilizadorModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
            });
            else res.render(path.resolve('views/pages/utilizadores/index.ejs'), { dados });   
        });
    });
};

//Controller Atualizar Utilizador
exports.update = (req, res) => {
    UtilizadorModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
        });
        else res.redirect('/utilizadores');  

    });
};

//Controller Eliminar Utilizador
exports.remove = (req, res) => {
    const id = req.params.id; 
    UtilizadorModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do utilizador"
        });
        else res.redirect('/utilizadores'); 

    });
};

//Controller Procurar ID Utilizador
exports.findById = (req, res) => {
    UtilizadorModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
        });
        else res.render(path.resolve('views/pages/utilizadores/update.ejs'), { dados });      

    });
};

