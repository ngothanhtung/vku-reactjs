// import './App.css';
import AudioPlayer from './Lesson04/AudioPlayer';
import Gallery from './Lesson04/Gallery';
import Rating from './Lesson04/Rating';
import StateExample from './Lesson04/StateExample';
import SuperButton from './Lesson04/SuperButton';
import { IoSaveOutline, IoHomeOutline } from 'react-icons/io5';
import MusicPlayer from './Lesson04/XExercises/MusicPlayer';
import OneChoice from './Lesson04/Quiz/OneChoice';
import OneChoiceQuestion from './Lesson04/OneChoiceQuestion';
import OneChoiceQuestions from './Lesson04/OneChoiceQuestions';
import FillInTheBlank from './Lesson04/FillInTheBlankQuestion';

// Fill in the blank question example
const question = {
  title: 'The capital of France is ___.',
  correctAnswer: 'Paris',
};
function App() {
  return (
    <>
      {/* <SuperButton type='warning' shape='square' style={{ backgroundColor: 'pink' }} textStyle={{ color: 'red' }} iconStyle={{ paddingRight: 20 }} loading={true} disabled={false} icon={<IoSaveOutline />} size='large'>
        <span>Click Me!</span>
      </SuperButton> */}

      {/* <StateExample /> */}
      {/* <AudioPlayer src='/assets/Song-Xa-Anh-Chang-De-Dang-Bao-Anh.mp3' /> */}
      {/* <Rating /> */}
      {/* <Gallery /> */}

      {/* <OneChoiceQuestions /> */}
      <FillInTheBlank question={question} />
      {/* <MusicPlayer /> */}
    </>
  );
}

export default App;
