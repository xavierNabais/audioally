const ServicoModel = require("../model/servico.model.js");
var path = require('path');

// Controller Procurar Serviços 
exports.findAll = (req, res) => {
    ServicoModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços"
        });
        else res.render(path.resolve('views/pages/servicos/index.ejs'), { dados });   

    });
};

// Controller Criar Serviço 
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const servico = new ServicoModel ({
        nome: req.body.nome,
        ativo: req.body.ativo,
    });

        ServicoModel.findBody(servico.nome, (error,data) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar criar um serviço."
            });
            else if (data.length > 0) {
                return res.status(400).send({
                    message: "O NIF já está em uso."
                });
            } else
                            ServicoModel.create(servico, (error, data) => {
                                if (error)
                                res.status(500).send({
                                    message:
                                    error.message || "Ocorreu um erro ao tentar criar um serviço."
                                });
                                else
                                ServicoModel.getAll((error, dados) => {
                                    if (error)
                                    res.status(500).send({
                                        message:
                                        error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços"
                                    });
                                    else res.render(path.resolve('views/pages/servicos/index.ejs'), { dados });   
                                });
                            });
        });
};

// Controller Atualizar Serviço 
exports.update = (req, res) => {
    ServicoModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do serviço"
        });
        else res.redirect('/servicos');

    });
};

//Controller Eliminar Serviço 
exports.remove = (req, res) => {
    const id = req.params.id; 
    ServicoModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do serviço"
        });
        else res.redirect('/servicos');

    });
};

//Controller Procurar Serviço Consoante ID
exports.findById = (req, res) => {
    console.log(req);
    ServicoModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do serviço"
        });
        else res.render(path.resolve('views/pages/servicos/update.ejs'), { dados });      

    });
};