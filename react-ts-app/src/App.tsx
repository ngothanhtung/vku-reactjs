// import './App.css';
import StateExample from './Lesson04/StateExample';
import SuperButton from './Lesson04/SuperButton';
import { IoSaveOutline, IoHomeOutline } from 'react-icons/io5';

function App() {
  return (
    <>
      {/* <SuperButton type='warning' shape='round' style={{ backgroundColor: 'violet' }} textStyle={{ color: 'red' }} iconStyle={{ paddingRight: 20 }} loading={false} disabled={false} icon={<IoSaveOutline />} size='large'>
        <span>Click Me!</span>
      </SuperButton> */}

      <StateExample />
    </>
  );
}

export default App;
