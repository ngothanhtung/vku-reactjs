import  { useState } from 'react';

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <section className='section'>
      <button onClick={handleToggle}>{isOn ? 'Turn OFF' : 'Turn ON'}</button>
      <p>State: {isOn ? 'ON' : 'OFF'}</p>
    </section>
  );
}

export default ToggleSwitch;