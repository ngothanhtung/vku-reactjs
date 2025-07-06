import { useEffect } from 'react';

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

export default function CleanupSocket() {
  useEffect(() => {
    const socket = connect();

    return () => {
      socket.close();
    };
  }, []);

  return <div>Chat</div>;
}
