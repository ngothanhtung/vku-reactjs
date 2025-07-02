import React from 'react';

export default function Block01({ name, percent = 20, primaryColor = 'red', secondaryColor = '#ff00a2' }) {
  const rowStyle = {
    display: 'flex',
    height: 54,
    backgroundColor: '#f0f0f0',
    width: 540,
  };

  const leftColumnStyle = {
    width: 140,
    backgroundColor: primaryColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    paddingRight: 16,
  };

  const rightColumnStyle = {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'start',
  };

  const textStyle = {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  const percentStyle = {
    width: `${percent}%`,
    backgroundColor: secondaryColor,
    height: '100%',
    paddingLeft: 16,
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={rowStyle}>
      <section style={leftColumnStyle}>
        <span style={textStyle}>{name}</span>
      </section>

      <section style={rightColumnStyle}>
        <div style={percentStyle}>
          <span style={textStyle}>{percent}%</span>
        </div>
      </section>
    </div>
  );
}
