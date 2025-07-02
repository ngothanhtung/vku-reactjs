import React from 'react';

export default function LikeButton() {
  const [like, setLike] = React.useState('👍');

  const style = {
    height: 48,
    width: 48,
    borderRadius: '50%',
  };

  const handleClick = () => {
    setLike((prevLike) => (prevLike === '👍' ? '👎🏻' : '👍'));
  };

  // render & re-render
  return (
    <button style={style} onClick={handleClick}>
      {like}
    </button>
  );
}
