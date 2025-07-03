const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Pastas que o sistema vai monitorar
const pastas = ['schemas', 'handlers', 'Pages', 'módulo', 'css'];

// Função para listar os arquivos de uma pasta
function listarPasta(pastaNome) {
    const pastaPath = path.join(__dirname, pastaNome);
    if (fs.existsSync(pastaPath)) {
        const arquivos = fs.readdirSync(pastaPath);
        console.log(`📂 ${pastaNome}/`);
        arquivos.forEach(arquivo => {
            console.log(`  ├─ ${arquivo}`);
        });
    } else {
        console.log(`❌ Pasta "${pastaNome}" não encontrada.`);
    }
}

// Carregar as rotas da pasta Pages
function carregarPages() {
    const pagesPath = path.join(__dirname, 'Pages');
    if (fs.existsSync(pagesPath)) {
        const arquivos = fs.readdirSync(pagesPath);
        arquivos.forEach(arquivo => {
            const ext = path.extname(arquivo);
            const nome = path.basename(arquivo, ext);

            if (ext === '.js') {
                const page = require(path.join(pagesPath, arquivo));
                app.get(`/${nome === 'index' ? '' : nome}`, page);
                console.log(`🌐 Página carregada: /${nome === 'index' ? '' : nome}`);
            }
        });
    }
}

// Lista todas as pastas e carrega as páginas
function listarTudo() {
    console.clear();
    console.log('🚀 Carregando sistema...\n');
    pastas.forEach(listarPasta);
    console.log('');
    carregarPages();
    console.log('\n✅ Sistema carregado com sucesso!');
}

// Inicializa a listagem
listarTudo();

// Monitora alterações nas pastas e recarrega
pastas.forEach(pastaNome => {
    const pastaPath = path.join(__dirname, pastaNome);
    if (fs.existsSync(pastaPath)) {
        fs.watch(pastaPath, { recursive: true }, (eventType, filename) => {
            console.log(`\n♻️ Alteração detectada em "${pastaNome}/${filename}" (${eventType}). Recarregando...`);
            // Limpa o cache das páginas
            if (pastaNome === 'Pages') {
                Object.keys(require.cache).forEach((key) => {
                    if (key.startsWith(path.join(__dirname, 'Pages'))) {
                        delete require.cache[key];
                    }
                });
            }
            listarTudo();
        });
    }
});

// Middleware para servir arquivos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`\n🌐 Servidor rodando em: http://localhost:${PORT}`);
});
