//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Marcacoes = function (data) {
    this.id_utilizador = data.utilizador,
    this.id_produtor = data.produtor,
    this.id_servico = data.servico,
    this.bpms = data.bpms,
    this.link = data.link,
    this.musica = data.musica
} 

// Model Criar Marcação
Marcacoes.create = (novoMarcacoes, result) => {
    sql.query('INSERT INTO marcacoes SET ?', novoMarcacoes, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Marcação criada com sucesso!");
        result(null,res);
    });
};



module.exports = Marcacoes;