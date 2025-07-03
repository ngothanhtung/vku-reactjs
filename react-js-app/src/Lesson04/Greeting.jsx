import React from 'react';
import PropTypes from 'prop-types';

function Greeting({ name, age, isStudent }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>Status: {isStudent ? 'Student' : 'Not a student'}</p>
    </div>
  );
}

// Add prop-types validation
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isStudent: PropTypes.bool,
};

export default Greeting;
