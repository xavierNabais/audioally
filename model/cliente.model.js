//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Cliente = function (data) {
    this.id_utilizador = data.utilizador,
    this.id_produtor = data.produtor,
    this.id_servico = data.servico,
    this.bpms = data.bpms,
    this.link = data.link,
    this.musica = data.musica
} 

// Model Criar Marcação
Cliente.create = (novoMarcacoes, result) => {
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

Cliente.getAll = (id, result) => {
    sql.query('SELECT * FROM marcacoes WHERE id_utilizador = ?', id, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        else {
            if (res.length === 0){
                result(null,res);
            }else{
                const marcacoesComNomes = [];
                const totalMarcacoes = res.length;
                let marcacoesProcessadas = 0;

                res.forEach(marcacao => {
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
            }
        }
    });
};

module.exports = Cliente;