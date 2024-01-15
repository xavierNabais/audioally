//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Login = function (data) {
    this.email = data.email;
    this.password = data.password;
};

// Model Procurar Utilizador
Login.findUser = (user, result) => {
    sql.query('SELECT * FROM utilizadores WHERE email = ? AND password = ?', [user.body.email, user.body.password], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        result(null, res);
    });
};
module.exports = Login;