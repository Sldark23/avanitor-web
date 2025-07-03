module.exports = (req, res) => {
    const html = `
    <html>
    <head>
        <title>avanitor - Dashboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #121212;
                color: #eee;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 40px;
            }
            h1 {
                margin-bottom: 10px;
            }
            .info {
                margin-bottom: 30px;
                font-size: 18px;
                color: #ccc;
            }
            .buttons {
                display: flex;
                gap: 20px;
            }
            .buttons a {
                background: #5865F2;
                color: white;
                padding: 12px 25px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: bold;
                transition: background 0.3s ease;
            }
            .buttons a:hover {
                background: #4752c4;
            }
        </style>
    </head>
    <body>
        <h1>avanitor</h1>
        <div class="info">
            <p><strong>Prefixo:</strong> a+</p>
            <p><strong>Biblioteca:</strong> Discord.js</p>
        </div>
        <div class="buttons">
            <a href="/comandos">Comandos</a>
            <a href="/sobre-mim">Sobre mim</a>
            <a href="/suporte">Suporte (Servidor)</a>
        </div>
    </body>
    </html>
    `;

    res.send(html);
};