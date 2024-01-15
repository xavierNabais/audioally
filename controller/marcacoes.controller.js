const MarcacoesModel = require("../model/marcacoes.model.js");
const ProdutorModel = require("../model/produtor.model");
const UtilizadorModel = require("../model/utilizador.model");
const ServicoModel = require("../model/servico.model");

var path = require('path');

//Controller Procurar Marcações
exports.findAll = (req, res) => {
    MarcacoesModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else    
        res.render(path.resolve('views/pages/marcacoes/index.ejs'), { dados });   

    });
};



//Controller Procurar Produtores e Serviços Disponíveis
exports.getActive = (req, res) => {
    UtilizadorModel.getAll((error, utilizador) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
        } else {
            ProdutorModel.getActive((error, produtor) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
                    });
                } else {
                    ServicoModel.getActive((error, servico) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
                            });
                        } else {
                            res.render(path.resolve('views/pages/marcacoes/create.ejs'), { utilizador, produtor, servico });  
                        }
                    });
                }
            });
        }
    });
};

//Controller Criar Marcação
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }
    const marcacoes = new MarcacoesModel ({
        utilizador: req.body.utilizador,
        produtor: req.body.produtor,
        servico: req.body.servico,
        bpms: req.body.bpms,
        musica: req.body.musica,
        link: req.body.link,
    });
    MarcacoesModel.create(marcacoes, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar uma marcação."
        });
        else res.redirect('/marcacoes'); 
    });
};

//Controller Atualizar Marcação
exports.update = (req, res) => {
    MarcacoesModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados de uma marcação"
        });
        else res.redirect('/marcacoes');   

    });
};

//Controller Eliminar Marcação
exports.remove = (req, res) => {
    const id = req.params.id; 
    MarcacoesModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados de uma marcação"
        });
        else res.redirect('/marcacoes');    

    });
};

//Controller Procurar Marcação Consoante ID
exports.findById = (req, res) => {
    MarcacoesModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else ServicoModel.getActive((error, servico) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços ativos"
                    });
                } else {
                    ProdutorModel.getActive((error, produtor) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos produtores ativos"
                            });
                        } else {
                            UtilizadorModel.getAll((error, utilizador) => {
                                if (error) {
                                    res.status(500).send({
                                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
                                    });
                                } else {
                                    res.render(path.resolve('views/pages/marcacoes/update.ejs'), { utilizador, produtor, servico, dados});  
                                }
                            }); 
                        }
                    });  
                }
            });
    });
};