import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { sortear } from "./util/sortear";
import { content } from "./util/content";
import CustomModal from "./components/Modal";

const App = () => {
  const cardsSortidos = sortear([...content]);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(cardsSortidos);
  const [indicesVirados, setindicesVirados] = useState([]);
  const [parearCards, setparearCards] = useState([]);
  const [start, setStart] = useState(true);
  const [life, setLife] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState("");
  const [button, setButton] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    setTimeout(() => {
      setStart(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if(score === content.length/2){
      setBody(`Você Ganhou!, Sua Pontuação: ${score}`);
      setButton("Tentar Novamente");
      handleShow();
    }
  }, [score]);

  useEffect(() => {
    setTimeout(match, 1000);
  }, [indicesVirados, cards, parearCards]);

  useEffect(() => {
    if (life <= 0) {
      setBody(`Você Perdeu, Sua Pontuação: ${score}`);
      setButton("Tentar Novamente");
      handleShow();
    }
  }, [life]);

  const match = () => {
    if (indicesVirados.length === 2) {
      const [primeiroIndice, segundoIndice] = indicesVirados;
      const primeiroCard = cards[primeiroIndice];
      const segundoCard = cards[segundoIndice];

      if (primeiroCard.correspondencia === segundoCard.id) {
        setScore((score) => score + 1);
        setparearCards([...parearCards, primeiroCard.id, segundoCard.id]);
        console.log(parearCards);
      } else {
        setLife((life) => life - 1);
      }
      setindicesVirados([]);
    }
  };

  const handleCardClick = (index) => {
    if (
      indicesVirados.length < 2 &&
      !indicesVirados.includes(index) &&
      !parearCards.includes(cards[index].id)
    ) {
      setindicesVirados([...indicesVirados, index]);
    }
  };

  return (
    <div className="App">
      <header class="bg-dark text-white text-center py-2">
        <h2>Jogo da memória (Otimização de páginas HTML) 19/11/2023</h2>
        <p>
          Por: Gabriel Marçal Pereira Leal, Gustavo Diogenes de Souza, Nicolas
          Evangelista Leocadio
        </p>
      </header>

      <div className="card-container">
        <div className="score">
          Chances: {life} <br />
          Pontuação: {score}
        </div>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              indicesVirados.includes(index) ||
              parearCards.includes(card.id) ||
              start
                ? "flipped"
                : "back"
            }`}
            onClick={() => handleCardClick(index)}
          >
            {indicesVirados.includes(index) ||
            parearCards.includes(card.id) ||
            start
              ? card.texto
              : card.tipo === "res"
              ? "DEFINIÇÃO"
              : "TERMO"}
          </div>
        ))}
      </div>
      <footer>
        <p class="footer-institution">
          Instituto Federal de Educação, Ciência e Tecnologia do Triângulo
          Mineiro (IFTM)
        </p>
        <p class="footer-course">
          Curso: Análise e Desenvolvimento de Sistemas
        </p>
        <p class="footer-subject">Matéria: Interfaces para Aplicações Web</p>
      </footer>
      <CustomModal
        showModal={showModal}
        handleClose={handleClose}
        handleShow={handleShow}
        bodyContent={body}
        buttonContent={button}
      />
    </div>
  );
};

export default App;
