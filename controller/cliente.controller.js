const ProdutorModel = require("../model/produtor.model");
const UtilizadorModel = require("../model/utilizador.model");
const ServicoModel = require("../model/servico.model");
const ClienteModel = require("../model/cliente.model");

var path = require('path');

//Controller Procurar Produtores e Serviços Disponíveis
exports.findAll = (req, res) => {
    const id = req.params.id;
            ProdutorModel.getActive((error, produtor) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos clientes"
                    });
                } else {
                    ServicoModel.getActive((error, servico) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos clientes"
                            });
                        } else {
                            res.render(path.resolve('views/pages/clientes/index.ejs'), { produtor, servico, id });  
                        }
                    });
                }
            });
        }


//Controller Criação Nova Marcação Cliente
exports.create = (req, res) => {

            if(!req.body){
                res.status(400).send({
                    message: "O conteúdo não pode estar vazio!"
                });
            }
            const clientes = new ClienteModel ({
                utilizador: req.params.id,
                produtor: req.body.produtor,
                servico: req.body.servico,
                bpms: req.body.bpms,
                musica: req.body.musica,
                link: req.body.link,
            });
            ClienteModel.create(clientes, (error, data) => {
                if (error)
                res.status(500).send({
                    message:
                    error.message || "Ocorreu um erro ao tentar criar um novo cliente."
                });
                else res.redirect('/cliente/sucesso/' + req.params.id);
            });
};