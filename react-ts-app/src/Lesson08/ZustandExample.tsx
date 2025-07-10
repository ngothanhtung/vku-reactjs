import React from 'react';

import { create } from 'zustand';

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state) => {
      return { bears: state.bears + 1 };
    }),
  removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

export default function ZustandExample() {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
}
