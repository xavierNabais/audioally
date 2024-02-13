const LoginModel = require("../model/login.model");

var path = require('path');



//Controller Verificação Login
exports.getUser = (req, res) => {
    LoginModel.findUser(req, (error, dados) => {
        if (error) {
            if (verification === 1){
                res.status(500).send({
                    message: error.message || "Password incorreta"
                });
            }else if (verification === 2){
                res.status(500).send({
                    message: error.message || "Email incorreto"
                });
            }
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
            });
        } else {
            if (dados && dados.length > 0) {
                if (dados[0].admin === 1){
                res.redirect('/utilizadores');
                } else{
                    res.redirect('/request/'+dados[0].id);
                }
                }
            else{
                res.status(401).send({
                    message: "Credenciais inválidas"
                });
            }
        }
    });
};