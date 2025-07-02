// import './App.css';
import React from 'react';

import MyButton from './Lesson03/MyButton';
import Block01 from './Lesson03/Block01';
import Blocks from './Lesson03/Blocks';
import LikeButton from './Lesson03/LikeButton';
import PictureViewer from './Lesson03/PictureViewer';
import ToDoList from './Lesson03/ToDoList';

const marketingItems = [
  {
    id: 1,
    name: 'BANDWIDTH',
    percent: 10,
    primaryColor: '#005198',
    secondaryColor: '#207dce',
  },
  {
    id: 2,
    name: 'USERS',
    percent: 50,
    primaryColor: '#470089',
    secondaryColor: '#b9008b',
  },

  {
    id: 4,
    name: 'VISITORS',
    percent: 90,
    primaryColor: '#005198',
    secondaryColor: '#207dce',
  },
  {
    id: 5,
    name: 'EMAIL',
    percent: 65,
    primaryColor: '#005198',
    secondaryColor: '#207dce',
  },
  {
    id: 6,
    name: 'STORAGE',
    percent: 50,
    primaryColor: '#470089',
    secondaryColor: '#b9008b',
  },
  {
    id: 7,
    name: 'SUPPORT',
    percent: 80,
    primaryColor: '#008700',
    secondaryColor: '#00e63d',
  },
  {
    id: 8,
    name: 'SECURITY',
    percent: 70,
    primaryColor: '#470089',
    secondaryColor: '#b9008b',
  },
];

function App() {
  return (
    <React.Fragment>
      {/* <div style={{ textAlign: 'center', margin: '20px' }}>
        <h1>Hello World</h1>
      </div> */}

      {/* <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <MyButton text='Save' color='blue' />
        <MyButton text='Cancel' />
        <MyButton text='Delete' color='red' />
      </div> */}
      {/* <hr /> */}
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Block01 name='BANDWIDTH' percent={10} primaryColor='#005198' secondaryColor='#207dce' />
        <Block01 name='STORAGE' percent={50} primaryColor='#470089' secondaryColor='#b9008b' />
        <Block01 name='USERS' percent={80} primaryColor='#008700' secondaryColor='#00e63d' />
        <Block01 name='VISITORS' percent={90} primaryColor='#005198' secondaryColor='#207dce' />
        <Block01 name='EMAIL' percent={65} primaryColor='#005198' secondaryColor='#207dce' />
      </div> */}
      {/* <div>
        <Blocks items={marketingItems} />
      </div> */}

      {/* <div>
        <LikeButton />
      </div> */}
      <div>
        {/* <PictureViewer /> */}
        <ToDoList />
      </div>
    </React.Fragment>
  );
}

export default App;
