import React, { useState } from 'react';

const StarRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingSubmit(rate); // Envia a nota escolhida para o backend ou componente pai
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              style={{ display: 'none' }}
            />
            <span
              style={{
                cursor: 'pointer',
                color: ratingValue <= rating ? '#ffc107' : '#e4e5e9',
                fontSize: '2rem'
              }}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
