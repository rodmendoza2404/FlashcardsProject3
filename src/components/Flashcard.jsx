import React, { useState } from "react";

function Flashcard({ question, answer }) {
  // Tracks whether we are showing the question or the answer
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div style={styles.cardContainer} onClick={handleFlip}>
      <div style={styles.cardContent}>
        {isFlipped ? answer : question}
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "100%",
    minHeight: "150px",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#fafafa",
  },
  cardContent: {
    padding: "10px",
    fontSize: "1.2rem",
    textAlign: "center",
  },
};

export default Flashcard;
