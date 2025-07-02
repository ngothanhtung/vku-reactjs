import React from 'react';

export default function PictureViewer() {
  const [indexOfImage, setIndexOfImage] = React.useState(1);

  const handleNext = () => {
    if (indexOfImage >= 5) {
      setIndexOfImage(1);
      return;
    }
    setIndexOfImage(indexOfImage + 1);
  };

  const handlePrevious = () => {
    if (indexOfImage > 1) {
      setIndexOfImage(indexOfImage - 1);
    }
  };

  const handleAutoplay = () => {
    let currentIndex = indexOfImage;
    const intervalId = setInterval(() => {
      if (currentIndex >= 5) {
        currentIndex = 1;
      } else {
        currentIndex += 1;
      }
      setIndexOfImage(currentIndex);
    }, 2000);

    // Stop autoplay after 10 seconds
    setTimeout(() => clearInterval(intervalId), 10000);
  };

  return (
    <div style={{ width: 540, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img src={`/images/${indexOfImage}.avif`} alt='' style={{ width: 300 }} />
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
        <button onClick={handlePrevious} style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>
          Previous
        </button>
        <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
          <span>{indexOfImage} / 5</span>
        </div>
        <button onClick={handleNext} style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer', marginLeft: 10 }}>
          Next
        </button>
        {/* AUTOPLAY BUTTON */}
        <div>
          <button onClick={handleAutoplay} style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer', marginLeft: 10 }}>
            Autoplay
          </button>
        </div>
      </div>
    </div>
  );
}
