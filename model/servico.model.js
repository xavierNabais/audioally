//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Servico = function (data) {
    this.id = data.id,
    this.nome = data.nome,
    this.ativo = data.ativo
} 

//Model Procurar Serviços
Servico.getAll = result => {
    sql.query('SELECT * FROM servicos', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Serviços Ativos
Servico.getActive = result => {
    sql.query('SELECT * FROM servicos WHERE ativo=1', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Serviço Existente
Servico.findBody = (nome, result) => {
    sql.query('SELECT * FROM servicos WHERE nome=?', [nome], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
}

//Model Procurar Serviço Consoante ID
Servico.FindById = (id, result) => {
    sql.query('SELECT * FROM servicos WHERE ID=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviços: ", res);
        result(null,res);
    });
};

//Model Procurar Nome Serviço Consoante ID
Servico.getNomeById = (id, callback) => {
    sql.query('SELECT nome FROM servicos WHERE ID=?', [id], (error, res) => {
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

//Model Criar Serviço
Servico.create = (novoServico, result) => {
    sql.query('INSERT INTO servicos SET ?', novoServico, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Servico criado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Serviço
Servico.update = (dados, result) => {
    sql.query('UPDATE servicos SET  nome=?, ativo=? WHERE id=?', [dados.nome, dados.ativo, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço alterado com sucesso!");
        result(null,res);
    });
};

//Model Eliminar Serviço
Servico.remove = (id, result) => {
    sql.query('DELETE FROM servicos WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço eliminado com sucesso!");
        result(null,res);
    });
};

module.exports = Servico;