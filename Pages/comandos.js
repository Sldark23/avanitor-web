const mongoose = require('mongoose');
require('dotenv').config();

// 📦 Schema Helps direto aqui
const helpSchema = new mongoose.Schema({
    comando: { type: String, required: true },
    categoria: { type: String, required: true },
    descricao: { type: String, required: true }
});
const Helps = mongoose.models.Helps || mongoose.model('Helps', helpSchema);

// 🔗 Função para conectar ao MongoDB
async function conectarMongoDB() {
    if (mongoose.connection.readyState === 0) { // 0 = desconectado
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('✅ Conectado ao MongoDB (/api/comandos)');
        } catch (err) {
            console.error('❌ Erro ao conectar ao MongoDB:', err.message);
            throw new Error('Falha na conexão com o banco: ' + err.message);
        }
    }
}

module.exports = async (req, res) => {
    try {
        // Conectar ao banco
        await conectarMongoDB();

        // Buscar todos os comandos e remover o _id
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
        console.error('❌ Erro na API /api/comandos:', error);

        // Retorna o erro detalhado no navegador
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao buscar comandos',
            erro: {
                tipo: error.name || 'ErroDesconhecido',
                mensagem: error.message,
                stack: error.stack
            }
        });
    }
};