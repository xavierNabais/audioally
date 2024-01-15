//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Utilizador = function (data) {
    this.id = data.id,
    this.username = data.username,
    this.nome = data.nome,
    this.email = data.email,
    this.data = data.data,
    this.password = data.password,
    this.sexo = data.sexo,
    this.admin = data.admin

} 

//Model Procurar Utilizadores
Utilizador.getAll = result => {
    sql.query('SELECT * FROM utilizadores', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        const dadosFormatados = res.map(item => {
            const dataOriginal = new Date(item.data);
            const ano = dataOriginal.getFullYear();
            const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0');
            const dia = dataOriginal.getDate().toString().padStart(2, '0');
    
            return {
                ...item,
                data: `${ano}-${mes}-${dia}`
            };
        });
        result(null,dadosFormatados);
    });
};

//Model Procurar ID Utilizador
Utilizador.FindById = (id, result) => {
    sql.query('SELECT * FROM utilizadores WHERE ID=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        result(null,res);
    });
};

//Model Criar Utilizador
Utilizador.create = (novoUtilizador, result) => {
    sql.query('INSERT INTO utilizadores SET ?', novoUtilizador, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Utilizador criado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Utilizador
Utilizador.update = (dados, result) => {
    const dataOriginal = dados.data;

    // Dividir a string em partes usando '/'
    const partesData = dataOriginal.split('/');
    
    // Reorganizar as partes da data e juntá-las usando '-'
    const dataFormatada = `${partesData[2]}-${partesData[0]}-${partesData[1]}`;

    sql.query('UPDATE utilizadores SET  username=?, nome=?, email=?, password=?, data=?, sexo=?, admin=? WHERE id=?', [dados.username, dados.nome, dados.email, dados.password, dataFormatada, dados.sexo, dados.admin, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
        result(null,res);
    });
};

//Model Eliminar Atualizador
Utilizador.remove = (id, result) => {
    sql.query('DELETE FROM utilizadores WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Utilizador eliminado com sucesso!");
        result(null,res);
    });
};

module.exports = Utilizador;