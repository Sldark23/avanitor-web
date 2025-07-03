import React, { useState, useEffect } from 'react';
import '../css/style.css';

const themes = {
  light: {
    '--bg-color': '#f5f5f5',
    '--text-color': '#222',
    '--btn-bg': '#4f46e5',
    '--btn-text': '#fff',
    '--header-bg': '#6366f1',
  },
  dark: {
    '--bg-color': '#121212',
    '--text-color': '#eee',
    '--btn-bg': '#7c3aed',
    '--btn-text': '#fff',
    '--header-bg': '#5b21b6',
  },
  pink: {
    '--bg-color': '#fff0f6',
    '--text-color': '#702459',
    '--btn-bg': '#ec4899',
    '--btn-text': '#fff',
    '--header-bg': '#db2777',
  },
};

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[theme];
    for (const key in themeColors) {
      root.style.setProperty(key, themeColors[key]);
    }
  }, [theme]);

  return (
    <div className="container">
      <header className="header">
        <h1>Avanitor Bot 🤖</h1>
        <p>
          O bot multifuncional topzera com economia, moderação, utilidades e muita diversão!  
          Controle seu servidor com estilo e praticidade.
        </p>
        <div className="theme-buttons">
          <button onClick={() => setTheme('light')}>🌞 Light</button>
          <button onClick={() => setTheme('dark')}>🌙 Dark</button>
          <button onClick={() => setTheme('pink')}>🌸 Pink</button>
        </div>
      </header>

      <main>
        <section className="features">
          <h2>Funcionalidades</h2>
          <ul>
            <li>💰 Economia completa: moedas, loja, ranks</li>
            <li>🔨 Moderação fácil: bans, kicks, warns</li>
            <li>🛠 Utilidades úteis: lembretes, pesquisas, traduções</li>
            <li>🎉 Diversão garantida: minigames, memes, quizzes</li>
            <li>⚙️ Configurações personalizáveis para seu servidor</li>
            <li>📊 Painel online com estatísticas em tempo real</li>
          </ul>
        </section>

        <section className="cta-buttons">
          <button onClick={() => alert('Função de convite em breve!')}>
            ➕ Adicionar Avanitor no seu servidor
          </button>
          <button onClick={() => alert('Em desenvolvimento: painel de controle!')}>
            🖥️ Acessar Dashboard
          </button>
          <button onClick={() => alert('Suporte chegando!')}>
            🛠️ Suporte e ajuda
          </button>
        </section>
      </main>
    </div>
  );
}