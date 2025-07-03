const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para ler JSON
app.use(express.json());

// Serve a pasta public como arquivos estáticos (ex: index.html)
app.use(express.static(path.join(__dirname, 'public')));

// 📦 Carregar handlers (módulos extras)
const fs = require('fs');
const handlersPath = path.join(__dirname, 'handlers');
if (fs.existsSync(handlersPath)) {
    fs.readdirSync(handlersPath).forEach(arquivo => {
        if (path.extname(arquivo) === '.js') {
            const handler = require(path.join(handlersPath, arquivo));
            if (typeof handler === 'function') {
                handler(app);
            }
        }
    });
}


// 🌐 Carregar rotas da pasta Pages como APIs (ex: /api/comandos)
const pagesPath = path.join(__dirname, 'Pages');
if (fs.existsSync(pagesPath)) {
    fs.readdirSync(pagesPath).forEach(arquivo => {
        if (path.extname(arquivo) === '.js') {
            const nome = path.basename(arquivo, '.js');
            const rota = `/api/${nome}`;
            const page = require(path.join(pagesPath, arquivo));
            app.get(rota, page);
        }
    });
}

// Redireciona qualquer rota desconhecida para o index.html da public (caso use React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});