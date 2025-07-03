const Helps = require('../schemas/helps');

module.exports = async (req, res) => {
    try {
        // Busca todos os comandos e remove o campo "_id"
        const comandos = await Helps.find().lean();

        const comandosSemId = comandos.map(cmd => ({
            comando: cmd.comando,
            categoria: cmd.categoria,
            descricao: cmd.descricao
        }));

        res.json({
            sucesso: true,
            total: comandosSemId.length,
            comandos: comandosSemId
        });
    } catch (error) {
        console.error('❌ Erro ao buscar comandos:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao buscar comandos'
        });
    }
};