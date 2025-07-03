const mongoose = require('mongoose');
const Helps = require('../schemas/helps');
require('dotenv').config();

// Função para conectar no MongoDB (só conecta se ainda não estiver conectado)
async function conectarMongoDB() {
    if (mongoose.connection.readyState === 0) { // 0 = desconectado
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('✅ Conectado ao MongoDB (rota /api/comandos)');
        } catch (err) {
            console.error('❌ Erro ao conectar ao MongoDB:', err.message);
            throw new Error('Falha na conexão com o banco');
        }
    }
}

module.exports = async (req, res) => {
    try {
        // Conecta ao banco antes de buscar os comandos
        await conectarMongoDB();

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
        console.error('❌ Erro na API /api/comandos:', error.message);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao buscar comandos'
        });
    }
};