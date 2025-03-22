import React from "react";

function CardSetInfo({ title, description, totalCards }) {
  return (
    <div style={styles.infoContainer}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Total Cards: {totalCards}</p>
    </div>
  );
}

const styles = {
  infoContainer: {
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
  },
};

export default CardSetInfo;
