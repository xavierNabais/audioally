const RegistoModel = require("../model/registo.model.js");

var path = require('path');

//Controller Criar Novo Cliente
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }
    const dataOriginal = req.body.data;

    // Dividir a string em partes utilizando '/'
    const partesData = dataOriginal.split('/');
    
    // Reorganizar as partes da data e juntá-las utilizando '-'
    const dataFormatada = `${partesData[2]}-${partesData[0]}-${partesData[1]}`;

    const novoRegisto = new RegistoModel ({
        nome: req.body.nome,
        username: req.body.username,
        email: req.body.email,
        data: dataFormatada,
        sexo: req.body.sexo,
        password: req.body.password,
        admin: 0,
    });
    RegistoModel.create(novoRegisto, (error, data) => {
        if (error)
            if (error === 1){
            res.status(500).send({
                message:
                error.message || "Username existente!"
            });            
            } else if(error === 2) {
                res.status(500).send({
                    message:
                    error.message || "Email existente!"
                });                     
            }
            else {
                res.status(500).send({
                    message:
                    error.message || "Ocorreu um erro ao tentar criar um utilizador."
                });
            }
            
        else
                RegistoModel.FindByUsername(req.body.username, (error, dados) => {
                    if (error)
                    res.status(500).send({
                        message:
                        error.message || "Ocorreu um erro ao tentar criar um utilizador."
                    });
                    else 
                    res.redirect('/cliente/formulario/'+data.insertId); 
                
                });
    });
};