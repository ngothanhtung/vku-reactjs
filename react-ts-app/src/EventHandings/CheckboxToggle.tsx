import React, { useState } from 'react';

function CheckboxToggle() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='section'>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Toggle me
      </label>
      <p>Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  );
}

export default CheckboxToggle;