//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Produtores = function (data) {
    this.id = data.id,
    this.nome = data.nome,
    this.nif = data.nif,
    this.especializacao = data.especializacao,
    this.ativo = data.ativo
} 

//Model Procurar Produtores
Produtores.getAll = result => {
    sql.query('SELECT * FROM produtores', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Produtores Ativos
Produtores.getActive = result => {
    sql.query('SELECT * FROM produtores WHERE ativo=1', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Nome PÇrodutor Consoante ID
Produtores.getNomeById = (id, callback) => {
    sql.query('SELECT nome FROM produtores WHERE ID=?', [id], (error, res) => {
        if (typeof callback !== 'function') {
            console.error("Callback não é uma função.");
            return;
        }
        if (error) {
            callback(error, null);
        } else {
            const nome = res && res.length > 0 ? res[0].username : null;
            callback(null, nome);
        }
    });
};

//Model Procurar ID Produtor
Produtores.FindById = (id, result) => {
    sql.query('SELECT * FROM produtores WHERE ID=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Produtores: ", res);
        result(null,res);
    });
};


//Model Criar Produtor
Produtores.create = (novoProdutor, result) => {
    sql.query('INSERT INTO produtores SET ?', novoProdutor, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Produtor criado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Produtor
Produtores.update = (dados, result) => {
    sql.query('UPDATE produtores SET  nome=?, nif=?, especializacao=?, ativo=? WHERE id=?', [dados.nome, dados.nif, dados.especializacao, dados.ativo, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Produtor alterado com sucesso!");
        result(null,res);
    });
};

//Model Eliminar Produtor
Produtores.remove = (id, result) => {
    sql.query('DELETE FROM produtores WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Produtor eliminado com sucesso!");
        result(null,res);
    });
};

module.exports = Produtores;