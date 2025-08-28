import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
type Props = {};

export default function LottieExample({}: Props) {
  return (
    <div>
      <DotLottieReact src="/assets/lotties/teaching.json" loop autoplay />

      {/* <img src={'/assets/vectors/education.svg'} /> */}
    </div>
  );
}
