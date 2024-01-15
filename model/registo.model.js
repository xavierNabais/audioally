//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const novoRegisto = function (data) {
    this.nome = data.nome,
    this.username = data.username,
    this.email = data.email,
    this.data = data.data,
    this.sexo = data.sexo,
    this.password = data.password,
    this.admin = 0
} 

//Model Criar Cliente
novoRegisto.create = (novoRegisto, result) => {
    sql.query('INSERT INTO utilizadores SET ?', novoRegisto, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Cliente criado com sucesso!");
        result(null,res);
    });
};

//Model Procurar Clientes Consoante Username
novoRegisto.FindByUsername = (id, result) => {
    sql.query('SELECT * FROM utilizadores WHERE username=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        result(null,res);
    });
};



module.exports = novoRegisto;