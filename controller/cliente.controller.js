const ProdutorModel = require("../model/produtor.model");
const MarcacoesModel = require("../model/marcacoes.model");
const ServicoModel = require("../model/servico.model");
const ClienteModel = require("../model/cliente.model");
const UtilizadorModel = require("../model/utilizador.model");
var path = require('path');

//Controller Procurar Produtores e Serviços Disponíveis
exports.findAll = (req, res) => {
    const id = req.params.id;
            ProdutorModel.getActive((error, produtor) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos produtores"
                    });
                } else {
                    ServicoModel.getActive((error, servico) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos servicos"
                            });
                        } else {
                            res.render(path.resolve('views/pages/clientes/index.ejs'), { produtor, servico, id });  
                        }
                    });
                }
            });
}
exports.findAll2 = (req, res) => {
    const id = req.params.id;
    UtilizadorModel.FindById(id, (error, utilizador) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos clientes"
            });
        } else{
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
                        } else{
                            ClienteModel.getAll(id, (error, dados) => {
                                if (error) {
                                    res.status(500).send({
                                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos clientes"
                                    });
                                } else{
                                    res.render(path.resolve('views/pages/request.ejs'), { produtor, servico, id, utilizador, dados });  
                                }
                            });

                            
                        }
                    });
                }
            });        
        }
    })

}
//Controller Procurar Produtores e Serviços Disponíveis
exports.getMarcacoesOfClient = (req, res) => {
    const id = req.params.id;

    // Chame o método getAll do modelo Cliente para obter as marcações do cliente
    ClienteModel.getAll(id, (error, dados) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos clientes"
            });
        } else {
            // Renderize a visualização com os dados obtidos
            res.render(path.resolve('views/pages/clientes/list.ejs'), { dados,id });
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
                else res.redirect('/request/' + req.params.id);
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
        else res.redirect('/cliente/marcacoes/'+id);

    });
};