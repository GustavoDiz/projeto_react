import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const sortear = (array) => {
  const sorteeeado = [...array];
  for (let i = sorteeeado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sorteeeado[i], sorteeeado[j]] = [sorteeeado[j], sorteeeado[i]];
  }
  return sorteeeado;
};

const App = () => {
  const definicoes = [
    { id: 0, texto: ' A compressão arquivos', correspondencia: 8 },
    { id: 1, texto: ' Minificação de Código', correspondencia: 9 },
    { id: 2, texto: ' Responsividade', correspondencia: 10 },
    { id: 3, texto: ' Lazy Loading', correspondencia: 11 },
    { id: 4, texto: ' Cache do Navegador', correspondencia: 12 },
    { id: 5, texto: ' Semântica HTML', correspondencia: 13 },
    { id: 6, texto: ' CSS e JavaScript Assíncronos', correspondencia: 14 },
    { id: 7, texto: ' Otimização de Imagens para Web', correspondencia: 15 },
  ];

  const respostas = [
    { id: 8, texto: ' Técnica que reduz o tamanho dos arquivos, diminuindo o tempo de carregamento da página', correspondencia: 0 },
    { id: 9, texto: ' Processo de remoção de espaços em branco e caracteres desnecessários no código fonte para reduzir o tamanho do arquivo.', correspondencia: 1 },
    { id: 10, texto:' Capacidade de um site se ajustar automaticamente a diferentes tamanhos de tela, oferecendo uma experiência consistente em dispositivos variados.', correspondencia: 2 },
    { id: 11, texto: ' Técnica que adia o carregamento de recursos não essenciais, melhorando o tempo de carregamento inicial da página.', correspondencia: 3 },
    { id: 12, texto: ' Armazenamento temporário de recursos locais no navegador, permitindo um carregamento mais rápido em visitas subsequentes.', correspondencia: 4 },
    { id: 13, texto: ' Uso apropriado de tags HTML para estruturar e descrever o conteúdo da página de maneira significativa para máquinas e desenvolvedores.', correspondencia: 5 },
    { id: 14, texto: ' Carregamento de recursos CSS e JavaScript de forma assíncrona para evitar bloqueios no carregamento da página.', correspondencia: 6 },
    { id: 15, texto: ' Adaptação de imagens para a web, ajustando formatos e resoluções para equilibrar qualidade e desempenho.', correspondencia: 7 },
  ];

  const cardsSortidos = sortear([...definicoes, ...respostas]);

  const [cards, setCards] = useState(cardsSortidos);
  const [indicesVirados, setindicesVirados] = useState([]);
  const [parearCards, setparearCards] = useState([]);

  useEffect(() => {
    if (indicesVirados.length === 2) {
      const [primeiroIndice, segundoIndice] = indicesVirados;
      const primeiroCard = cards[primeiroIndice];
      const segundoCard = cards[segundoIndice];

      if (primeiroCard.correspondencia === segundoCard.id && segundoCard.correspondencia === primeiroCard.id) {
        setparearCards([...parearCards, primeiroCard.id, segundoCard.id]);
      }
      setTimeout(() => setindicesVirados([]), 1000);
    }
  }, [indicesVirados, cards, parearCards]);

  const handleCardClick = (index) => {
    if (indicesVirados.length < 2 && !indicesVirados.includes(index) && !parearCards.includes(cards[index].id)) {
      setindicesVirados([...indicesVirados, index]);
    }
  };

 
  return (

    <div className="App">
        <header class="bg-dark text-white text-center py-2">
          <h2>Joguinho da memória (Otimização de páginas HTML) 19/11/2023</h2>
          <p class="lead">Exploring a little about React</p>
          <p>By: Gabriel Marçal Pereira Leal, Gustavo Diogenes de Souza, Nicolas Evangelista Leocadio</p>
      </header>
      <div className="card-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${indicesVirados.includes(index) || parearCards.includes(card.id) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {indicesVirados.includes(index) || parearCards.includes(card.id) ? card.texto : '???'}
            </div>
          ))}
      </div>

      <footer>
        <p class="footer-institution">Instituto Federal de Educação, Ciência e Tecnologia do Triângulo Mineiro (IFTM)</p>
        <p class="footer-course">Curso: Análise e Desenvolvimento de Sistemas</p>
        <p class="footer-subject">Matéria: Interfaces para Aplicações Web</p>    
      </footer>
    </div>
  );
};

export default App;