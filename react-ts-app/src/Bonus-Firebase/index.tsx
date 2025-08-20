/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { Button } from 'antd';
import { db } from './libraries/firebase/initializeApp';
import ChatBox from './ChatBox';
type Props = {};

export default function FirebaseExample({}: Props) {
  const handleAddData = async () => {
    const docRef = await addDoc(collection(db, 'messages'), {
      from: 'tungnt@softech.vn',
      to: 'nhannn@softech.vn',
      content: 'Hello, this is a test message!',
      created_at: Timestamp.fromDate(new Date()),
    });

    console.log('Document written with ID: ', docRef.id);
  };

  const handleDeleteData = async () => {
    const docRef = doc(db, 'messages', 'rBjSkzQItoVBjWuFZbgQ');
    await deleteDoc(docRef);
  };

  const handleReadData = async () => {
    const docRef = doc(db, 'messages', '3qkYhMhv9lniQakhqadB');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const handleGetMultipleDocs = async () => {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const handleGetSubcollectionDocs = async () => {
    const querySnapshot = await getDocs(collection(db, 'messages', '2cqjBPTjY86OLTGO4dwU', 'logs'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <div>
      {/* <Button onClick={handleAddData}>Add data</Button> */}
      {/* <Button onClick={handleAddData}>Add data</Button>
      <Button onClick={handleDeleteData}>Delete data</Button>
      <Button onClick={handleReadData}>Read a doc</Button>
      <Button onClick={handleGetMultipleDocs}>Get multiple docs</Button>
      <Button onClick={handleGetSubcollectionDocs}>Get all documents in a subcollection</Button> */}

      {/* <ul>
        {messages.map((message, index) => (
          <li key={index}>{message?.content}</li>
        ))}
      </ul> */}
      <ChatBox />
    </div>
  );
}
