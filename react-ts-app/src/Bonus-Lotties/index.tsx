import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
type Props = {};

export default function LottieExample({}: Props) {
  return (
    <div>
      <DotLottieReact src="https://assets-v2.lottiefiles.com/a/3f907b04-8f0c-4483-a83f-59fd009b55d8/nKnq6P2G7R.lottie" loop autoplay />

      {/* <img src={'/public/assets/vectors/education.svg'} /> */}
    </div>
  );
}
