const Helps = require('../schemas/helps');

module.exports = async (req, res) => {
    try {
        const comandos = await Helps.find().lean();

        let html = `<h1>📜 Lista de Comandos</h1>`;
        html += `<ul>`;
        comandos.forEach(cmd => {
            html += `<li><strong>${cmd.comando}</strong> [${cmd.categoria}] - ${cmd.descricao}</li>`;
        });
        html += `</ul>`;

        res.send(html);
    } catch (error) {
        console.error('Erro ao carregar comandos:', error);
        res.status(500).send('Erro interno ao carregar comandos');
    }
};