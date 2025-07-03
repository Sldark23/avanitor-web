const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    try {
        // Caminho para o arquivo JSON
        const filePath = path.join(__dirname, '../data/comandos.json');

        // Ler e parsear o JSON
        const data = fs.readFileSync(filePath, 'utf8');
        const comandos = JSON.parse(data);

        res.json({
            sucesso: true,
            total: comandos.length,
            comandos: comandos
        });
    } catch (error) {
        console.error('❌ Erro ao carregar comandos JSON:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao carregar comandos',
            erro: error.message
        });
    }
};