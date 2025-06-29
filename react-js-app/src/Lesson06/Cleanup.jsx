import React, { useEffect } from 'react';

export default function Cleanup() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Timer</div>;
}
const connect = () => {
  const socket = new WebSocket('ws://example.com/socket');

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  return socket;
};

function Chat() {
  useEffect(() => {
    const socket = connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Chat</div>;
}
