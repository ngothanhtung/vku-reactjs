import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LottieExample() {
  return (
    <div>
      <DotLottieReact src="/assets/lotties/truck.json" loop autoplay />

      <img src={'/assets/vectors/shipping.svg'} />
    </div>
  );
}
