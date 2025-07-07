import React, { useState } from 'react';
import './App.css';
import SubscriptionExamples from './Lesson06/SubscriptionExamples';
import UseEffectHookExamples from './Lesson06/UseEffectHookExamples';
import ButtonClickCounter from './Sesson05-Guidelines/EventHandings/ButtonClickCounter';
import CheckboxToggle from './Sesson05-Guidelines/EventHandings/CheckboxToggle';
import DoubleClickMessage from './Sesson05-Guidelines/EventHandings/DoubleClickMessage';
import DropdownSelection from './Sesson05-Guidelines/EventHandings/DropdownSelection';
import FormSubmissionAlert from './Sesson05-Guidelines/EventHandings/FormSubmissionAlert';
import HoverHighlight from './Sesson05-Guidelines/EventHandings/HoverHighlight';
import InputFieldTracker from './Sesson05-Guidelines/EventHandings/InputFieldTracker';
import KeyPressDisplay from './Sesson05-Guidelines/EventHandings/KeyPressDisplay';
import SearchFilter from './Sesson05-Guidelines/EventHandings/SearchFilter';
import ToggleSwitch from './Sesson05-Guidelines/EventHandings/ToggleSwitch';
import DomUpdateExamples from './Lesson06/DomUpdateExamples';

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <main className='container'>
      {/* <ButtonClickCounter />
      <InputFieldTracker />
      <ToggleSwitch />
      <HoverHighlight />
      <FormSubmissionAlert />
      <KeyPressDisplay />
      <DoubleClickMessage />
      <DropdownSelection />
      <CheckboxToggle />
      <SearchFilter /> */}
      <UseEffectHookExamples />
      {/* {mounted && <SubscriptionExamples />}
      <button onClick={() => setMounted(!mounted)}>Mount / Unmount</button> */}

      {/* <DomUpdateExamples /> */}
    </main>
  );
}

export default App;
