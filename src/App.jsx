import"./App.css"
import React,{useState,useEffect} from 'react'
import image01 from "./Img/carddd.jpg"
import image02 from './Img/carddd2.jpg';
import image03 from './Img/card3.jpg';
import image04 from './Img/carddd4.jpg';
import image05 from './Img/card5.jpg';
import image06 from './Img/card6.jpg';
import backgroundImg from "./Img/background.jpg";
const ImgCards = [
  { src: image01 },
  { src: image02 },
  { src: image03 },
  { src: image04 },
  { src: image05 },
  { src: image06 }
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...ImgCards, ...ImgCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTurns(0);
  };

  const handleCardClick = (id) => {
    if (flippedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === id);
      if (firstCard.src === secondCard.src) {
        setMatchedCards([...matchedCards, flippedCards[0], id]);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setTurns(turns + 1);
      }, 1000);
    }
  };

  return (
    <div className='App'>
      <h1>Memory Card Game</h1>
       <div className='game-info'>
        <p>Turns: {turns}</p>
        <button className="btn" onClick={shuffleCards}>New Game</button>
      </div>
      <div className='card-grid'>
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              src={flippedCards.includes(card.id) || matchedCards.includes(card.id) ? card.src : backgroundImg}
              alt='card'
              className='card-image'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;