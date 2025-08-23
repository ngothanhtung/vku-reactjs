/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { addDoc, collection, onSnapshot, query, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { Button, Form, Input } from 'antd';
import { db } from './libraries/firebase/initializeApp';

export default function ChatBox() {
  const [messages, setMessages] = React.useState<any[]>([]);

  const messagesRef = collection(db, `messages`);

  React.useEffect(() => {
    const q = query(messagesRef);
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const items: any[] = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());

        items.push(doc.data());
      });

      const sortedItems = items.sort((a, b) => {
        return (a.created_at as Timestamp).toMillis() - (b.created_at as Timestamp).toMillis();
      });

      setMessages(sortedItems);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const onFinish = async (values: any) => {
    console.log('Received values:', values);
    const docRef = await addDoc(collection(db, 'messages'), {
      from: values.username,
      // to: 'nhannn@softech.vn',
      content: values.message,
      created_at: Timestamp.fromDate(new Date()),
    });

    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <div className="p-4">
      <Form name="chat" onFinish={onFinish}>
        <Form.Item name="username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="message">
          <Input placeholder="Message" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Send message
          </Button>
        </Form.Item>
      </Form>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message?.content}</li>
        ))}
      </ul>
    </div>
  );
}
