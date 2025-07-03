import React from 'react';
import PropTypes from 'prop-types';

function ButtonWithPropTypes({ text, width, disabled, style, khiClickChuot }) {
  return (
    <button
      style={{ width, ...style }}
      disabled={disabled}
      onClick={() => {
        if (khiClickChuot && typeof khiClickChuot === 'function') {
          khiClickChuot();
        }
      }}
    >
      {text}
    </button>
  );
}

ButtonWithPropTypes.defaultProps = {
  width: '100px',
  disabled: false,
  style: {},
  khiClickChuot: null,
};

ButtonWithPropTypes.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  khiClickChuot: PropTypes.func,
};
export default ButtonWithPropTypes;
