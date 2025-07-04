import React, { useState } from 'react';

function DoubleClickMessage() {
  const [showMessage, setShowMessage] = useState(false);

  const handleDoubleClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <section className='section'>
      <button onClick={()=>{
        console.log('single Clicked');
      }} onDoubleClick={handleDoubleClick}>Double Click Me</button>
      {showMessage && <p>Double-clicked!</p>}
    </section>
  );
}

export default DoubleClickMessage;