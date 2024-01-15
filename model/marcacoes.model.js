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

// Model Procurar Marcações
Marcacoes.getAll = result => {
    sql.query('SELECT * FROM marcacoes', (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        else {
            const marcacoesComNomes = [];
            const totalMarcacoes = res.length;
            let marcacoesProcessadas = 0;

            res.forEach(marcacao => {
                // Consulta para buscar o nome do utilizador
                sql.query('SELECT nome FROM utilizadores WHERE id=?', [marcacao.id_utilizador], (err, utilizador) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    const nomeUtilizador = utilizador && utilizador.length > 0 ? utilizador[0].nome : 'Nome não encontrado';

                    // Consulta para buscar o nome do produtor
                    sql.query('SELECT nome FROM produtores WHERE id=?', [marcacao.id_produtor], (err, produtor) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }
                        const nomeProdutor = produtor[0].nome;
                        // Consulta para buscar o nome do serviço
                        sql.query('SELECT nome FROM servicos WHERE id=?', [marcacao.id_servico], (err, servico) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }
                            const nomeServico = servico[0].nome;
                            const marcacaoComNomes = {
                                id: marcacao.id,
                                id_utilizador: nomeUtilizador,
                                id_produtor: nomeProdutor,
                                id_servico: nomeServico,
                                bpms: marcacao.bpms,
                                musica: marcacao.musica,
                                link: marcacao.link
                            };
                            marcacoesComNomes.push(marcacaoComNomes);
                            marcacoesProcessadas++;

                            if (marcacoesProcessadas === totalMarcacoes) {
                                result(null, marcacoesComNomes);
                            }
                        });
                    });
                });
            });
        }
    });
};

//Model Procurar ID Marcação
Marcacoes.FindById = (id, result) => {
    sql.query('SELECT * FROM marcacoes WHERE ID=? LIMIT 1', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Criar Marcação
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

//Model Atualizar Marcação
Marcacoes.update = (dados, result) => {
    console.log(dados);
    sql.query('UPDATE marcacoes SET  id_utilizador=?, id_produtor=?, id_servico=?, bpms=?, musica=?, link=? WHERE id=?', [dados.utilizador,dados.produtor,dados.servico,dados.bpms,dados.musica,dados.link, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Marcação alterada com sucesso!");
        result(null,res);
    });
};

//Model Eliminar Marcação
Marcacoes.remove = (id, result) => {
    sql.query('DELETE FROM marcacoes WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Marcação eliminada com sucesso!");
        result(null,res);
    });
};

module.exports = Marcacoes;