import React, { useState } from "react";
import "./App.css";

const initialFlashcardsData = [
  {
    question: "What is the main goal of the React library created by Facebook for modern web development?",
    answer: "Building dynamic UIs"
  },
  {
    question: "Which structure does React use to optimize and manage updates more efficiently in the browser?",
    answer: "Virtual DOM tree"
  },
  {
    question: "What do we call the read-only inputs that allow data to be passed down to child components in React?",
    answer: "Read-only component inputs"
  },
  {
    question: "How do we describe the internal data that changes within a component and triggers re-renders in React?",
    answer: "Mutable component state"
  },
  {
    question: "Which specialized React functions allow you to use state and lifecycle features without writing class components?",
    answer: "React Hooks library"
  },
  {
    question: "Which React Hook is used for managing side effects such as data fetching or updating the DOM?",
    answer: "useEffect side effect hook"
  },
  {
    question: "Which React Hook do you use to declare a piece of local state in a functional component?",
    answer: "useState for local state"
  },
  {
    question: "How should you uniquely identify each list item for better rendering performance in React?",
    answer: "Use unique keys property"
  },
  {
    question: "Which CLI tools are widely used to manage and install dependencies in a React project environment?",
    answer: "npm m ProjectCLI,ExpoCLI"
  },
  {
    question: "What specialized React component reduces unnecessary re-renders by shallowly comparing props and state?",
    answer: "React Pure Component class"
  },
  {
    question: "Which open-source bundler is commonly utilized with React to package modules and assets for production?",
    answer: "Webpack or Parcel bundler"
  },
  {
    question: "Which preconfigured environment quickly sets up a React project with default scripts and configurations?",
    answer: "Create React App tool"
  }
];

function sanitizeString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getLevenshteinDistance(a, b) {
  const m = [];
  let i, j;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  for (i = 0; i <= b.length; i++) m[i] = [i];
  for (j = 0; j <= a.length; j++) m[0][j] = j;
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        m[i][j] = m[i - 1][j - 1];
      } else {
        m[i][j] =
          1 +
          Math.min(m[i - 1][j], m[i][j - 1], m[i - 1][j - 1]);
      }
    }
  }
  return m[b.length][a.length];
}

function checkAnswerClose(userGuess, correctAnswer) {
  const guess = sanitizeString(userGuess);
  const correct = sanitizeString(correctAnswer);
  if (!guess || !correct) return false;
  if (guess === correct) return true;
  if (guess.includes(correct) || correct.includes(guess)) return true;
  return getLevenshteinDistance(guess, correct) <= 2;
}

export default function App() {
  const [deck, setDeck] = useState([...initialFlashcardsData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  if (deck.length === 0) {
    return (
      <div className="container">
        <h1 className="heading">All React Cards Mastered!</h1>
        <p>
          Current Streak: {currentStreak}, Longest Streak: {maxStreak}
        </p>
        {masteredCards.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Mastered Cards:</h3>
            <ul>
              {masteredCards.map((card, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  <strong>Q:</strong> {card.question}
                  <br />
                  <strong>A:</strong> {card.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const currentCard = deck[currentIndex];

  function handleFlip() {
    setFeedback("");
    setShowAnswer(!showAnswer);
  }

  function handleNext() {
    setShowAnswer(false);
    setFeedback("");
    setUserGuess("");
    setCurrentIndex((prev) => (prev === deck.length - 1 ? 0 : prev + 1));
  }

  function handlePrev() {
    setShowAnswer(false);
    setFeedback("");
    setUserGuess("");
    setCurrentIndex((prev) => (prev === 0 ? deck.length - 1 : prev - 1));
  }

  function handleSubmitGuess() {
    if (checkAnswerClose(userGuess, currentCard.answer)) {
      setFeedback("Correct!");
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setFeedback("Incorrect, try again!");
      setCurrentStreak(0);
    }
  }

  function handleShuffle() {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    setDeck(newDeck);
    setCurrentIndex(0);
    setShowAnswer(false);
    setFeedback("");
    setUserGuess("");
  }

  function handleMastered() {
    const masteredCard = deck[currentIndex];
    setMasteredCards((prev) => [...prev, masteredCard]);
    const newDeck = [...deck];
    newDeck.splice(currentIndex, 1);
    let newIndex = currentIndex;
    if (newIndex >= newDeck.length) {
      newIndex = 0;
    }
    setDeck(newDeck);
    setCurrentIndex(newIndex);
    setShowAnswer(false);
    setFeedback("");
    setUserGuess("");
  }

  return (
    <div className="container">
      <h1 className="heading">React Flashcards</h1>
      <p>Test your knowledge of React!</p>
      <p className="cardsCount">Number of cards: {deck.length}</p>
      <p className="streakCount">
        Current Streak: {currentStreak}, Longest Streak: {maxStreak}
      </p>
      <div className="flashcard" onClick={handleFlip}>
        {showAnswer ? currentCard.answer : currentCard.question}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
      <div className="guessContainer">
        <label htmlFor="guessInput">Guess:</label>
        <input
          id="guessInput"
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Type your guess..."
          className="input"
        />
        <button className="button" onClick={handleSubmitGuess}>
          Submit Guess
        </button>
      </div>
      <div className="controls">
        <button className="button" onClick={handlePrev}>
          ←
        </button>
        <button className="button" onClick={handleNext}>
          →
        </button>
        <button className="button" onClick={handleShuffle}>
          Shuffle
        </button>
        <button className="button" onClick={handleMastered}>
          Mastered
        </button>
      </div>
      {masteredCards.length > 0 && (
        <div className="masteredContainer">
          <h3>Mastered React Cards</h3>
          <ul>
            {masteredCards.map((card, idx) => (
              <li key={idx}>
                <strong>Q:</strong> {card.question}
                <br />
                <strong>A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
