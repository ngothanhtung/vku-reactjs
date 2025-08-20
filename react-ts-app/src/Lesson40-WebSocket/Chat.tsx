import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import type { ChatMessage, ConnectionStatus } from './types';
import styles from './Chat.module.css';

// WebSocket server configuration
const WEBSOCKET_URL = 'http://localhost:8080/ws';

export default function Chat() {
  // State management
  const [username, setUsername] = useState<string>('');
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Refs for WebSocket and DOM elements
  const stompClientRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Connection function
  const connect = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      alert('Please enter a username');
      return;
    }

    setConnectionStatus('connecting');

    try {
      const socket = new SockJS(WEBSOCKET_URL);
      const client = Stomp.over(socket);

      // Disable console logs for cleaner output
      client.debug = () => {};

      stompClientRef.current = client;

      client.connect(
        {},
        (frame) => {
          console.log('Connected: ' + frame);
          setConnectionStatus('connected');
          setIsConnected(true);

          // Subscribe to the topic
          client.subscribe('/topic/public', (message) => {
            const chatMessage: ChatMessage = JSON.parse(message.body);
            showMessage(chatMessage);
          });

          // Send join message
          client.send(
            '/app/chat.addUser',
            {},
            JSON.stringify({
              sender: trimmedUsername,
              type: 'JOIN',
            })
          );
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          setConnectionStatus('disconnected');
          setIsConnected(false);
        }
      );
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('disconnected');
      setIsConnected(false);
    }
  };

  // Disconnect function
  const disconnect = () => {
    if (stompClientRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (stompClientRef.current as any).disconnect();
      stompClientRef.current = null;
    }
    setConnectionStatus('disconnected');
    setIsConnected(false);
    setMessages([]);
    console.log('Disconnected');
  };

  // Send message function
  const sendMessage = () => {
    const messageContent = currentMessage.trim();

    if (messageContent && stompClientRef.current && isConnected) {
      const chatMessage: ChatMessage = {
        sender: username,
        content: messageContent,
        type: 'CHAT',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (stompClientRef.current as any).send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setCurrentMessage('');
    }
  };

  // Show message function
  const showMessage = (message: ChatMessage) => {
    // Add timestamp if not provided
    const messageWithTimestamp: ChatMessage = {
      ...message,
      timestamp: message.timestamp || new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
  };

  // Handle keyboard events
  const handleUsernameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      connect();
    }
  };

  const handleMessageKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Get status display text
  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
      default:
        return 'Disconnected';
    }
  };

  // Render message component
  const renderMessage = (message: ChatMessage, index: number) => {
    return (
      <div key={index} className={`${styles.message} ${styles[message.type.toLowerCase()]}`}>
        <div className={styles.messageTime}>{message.timestamp}</div>
        {message.type === 'CHAT' ? (
          <>
            <div className={styles.messageSender}>{message.sender}:</div>
            <div className={styles.messageContent}>{message.content}</div>
          </>
        ) : (
          <div className={styles.messageContent}>{message.content}</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatHeaderTitle}>🚀 WebSocket Chat Demo</h1>
        </div>

        <div className={`${styles.status} ${styles[connectionStatus]}`}>{getStatusText()}</div>

        {!isConnected ? (
          <div className={styles.usernameForm}>
            <input
              type="text"
              className={styles.usernameInput}
              placeholder="Enter your username"
              maxLength={20}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleUsernameKeyPress}
              disabled={connectionStatus === 'connecting'}
            />
            <button className={styles.connectButton} onClick={connect} disabled={connectionStatus === 'connecting'}>
              {connectionStatus === 'connecting' ? 'Connecting...' : 'Join Chat'}
            </button>
          </div>
        ) : (
          <div className={styles.chatArea}>
            <div ref={messageAreaRef} className={styles.chatMessages}>
              {messages.map((message, index) => renderMessage(message, index))}
            </div>
            <div className={styles.chatInput}>
              <input
                type="text"
                className={styles.messageInput}
                placeholder="Type your message..."
                maxLength={500}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleMessageKeyPress}
              />
              <button className={styles.sendButton} onClick={sendMessage} disabled={!currentMessage.trim()}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
