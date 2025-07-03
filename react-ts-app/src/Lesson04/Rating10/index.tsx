import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa6';

export default function Rating10({ value = 0 }: { value?: number }) {
  const [rating, setRating] = React.useState(value);
  const stars = [1, 2, 3, 4, 5]; // Only 5 stars

  const handleStarClick = (starIndex: number, isHalf: boolean = false) => {
    // Each star represents 2 points, half star adds 1 point
    const newRating = isHalf ? starIndex * 2 - 1 : starIndex * 2;
    setRating(newRating);
  };

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {stars.map((starIndex) => {
        const starValue = starIndex * 2; // Each star worth 2 points
        const halfStarValue = starIndex * 2 - 1; // Half star worth 1 less

        const isFullStar = rating >= starValue;
        const isHalfStar = rating === halfStarValue;

        return (
          <div key={starIndex} style={{ position: 'relative', display: 'inline-block' }}>
            {isFullStar ? (
              <FaStar style={{ color: 'orange', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleStarClick(starIndex, false)} />
            ) : isHalfStar ? (
              <FaStarHalf style={{ color: 'orange', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleStarClick(starIndex, false)} />
            ) : (
              <FaStar style={{ color: 'lightgray', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleStarClick(starIndex, false)} />
            )}
            {/* Invisible half-star overlay for half-star clicks */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                cursor: 'pointer',
                zIndex: 1,
              }}
              onClick={() => handleStarClick(starIndex, true)}
            />
          </div>
        );
      })}
      <span style={{ marginLeft: '10px', fontSize: '16px', color: '#666' }}>{rating}/10</span>
    </div>
  );
}
