require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async (app) => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('❌ Erro: MONGO_URI não encontrado no arquivo .env');
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    }
};