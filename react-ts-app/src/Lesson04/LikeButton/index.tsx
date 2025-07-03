import React from 'react';
import { BiSolidLike, BiLike } from 'react-icons/bi';

type Props = {
  like?: boolean;
};

export default function LikeButton({ like }: Props) {
  const [isLiked, setIsLiked] = React.useState(like || false);

  return (
    <button
      onClick={() => setIsLiked((prev) => !prev)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'inherit',
      }}
    >
      {isLiked ? <BiSolidLike /> : <BiLike />}
    </button>
  );
}
