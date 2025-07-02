import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import BatchingStateUpdates from './Lesson04/BatchingStateUpdates';
import UseEffectAndState from './Lesson04/UseEffectAndState';
import ContextAPI from './Lesson04/ContextAPI';
import UseReducerHook from './Lesson04/UseReducerHook';
import CombineStateAndReducer from './Lesson04/CombineStateAndReducer';
import EventBubbling from './Lesson05/EventBubbling';
import CapturingEvents from './Lesson05/CapturingEvents';
import HandlingKeyboardEvents from './Lesson05/HandlingKeyboardEvents';
import HandlingMouseEvents from './Lesson05/HandlingMouseEvents';
import UncontrolledInputs from './Lesson05/UncontrolledInputs';
import HandlingTouchEvents from './Lesson05/HandlingTouchEvents';
import ThrottlingAndDebouncingEvents from './Lesson05/ThrottlingAndDebouncingEvents';

function App() {
  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <BatchingStateUpdates />
        <UseEffectAndState />
        <ContextAPI />
        <UseReducerHook />
        <CombineStateAndReducer />
        <EventBubbling />
        <CapturingEvents />
        <HandlingKeyboardEvents />
        <HandlingMouseEvents />
        <UncontrolledInputs />
        <HandlingTouchEvents />
        <ThrottlingAndDebouncingEvents />
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
