/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // Dynamic topic state
  const [topicName, setTopicName] = useState<string>('');
  const [joinedTopic, setJoinedTopic] = useState<string | null>(null);
  const [topicMessages, setTopicMessages] = useState<ChatMessage[]>([]);
  const topicSubscriptionRef = useRef<any>(null);

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
  // Auto-scroll for topic messages
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [topicMessages]);

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

          // Subscribe to the public topic
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

          // If already joined a topic, re-subscribe
          if (joinedTopic) {
            subscribeToDynamicTopic(joinedTopic);
          }
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
    if (topicSubscriptionRef.current) {
      topicSubscriptionRef.current.unsubscribe();
      topicSubscriptionRef.current = null;
    }
    if (stompClientRef.current) {
      (stompClientRef.current as any).disconnect();
      stompClientRef.current = null;
    }
    setConnectionStatus('disconnected');
    setIsConnected(false);
    setMessages([]);
    setTopicMessages([]);
    setJoinedTopic(null);
    console.log('Disconnected');
  };
  // Subscribe to a dynamic topic
  const subscribeToDynamicTopic = (topic: string) => {
    if (!stompClientRef.current) return;
    if (topicSubscriptionRef.current) {
      topicSubscriptionRef.current.unsubscribe();
      topicSubscriptionRef.current = null;
    }
    setTopicMessages([]);
    topicSubscriptionRef.current = (stompClientRef.current as any).subscribe(`/topic/dynamic/${topic}`, (message: any) => {
      const chatMessage: ChatMessage = JSON.parse(message.body);
      setTopicMessages((prev) => {
        const next = [...prev, chatMessage];
        return next.length > 100 ? next.slice(next.length - 100) : next;
      });
    });
  };

  // Join a dynamic topic
  const joinTopic = () => {
    const trimmedTopic = topicName.trim();
    if (!trimmedTopic || !username.trim()) {
      alert('Please enter a topic name and username');
      return;
    }
    if (!stompClientRef.current) {
      alert('Please connect first');
      return;
    }
    // Send join message
    (stompClientRef.current as any).send('/app/topic.join', {}, JSON.stringify({ topicName: trimmedTopic, username }));
    subscribeToDynamicTopic(trimmedTopic);
    setJoinedTopic(trimmedTopic);
  };

  // Leave a dynamic topic
  const leaveTopic = () => {
    if (!joinedTopic || !stompClientRef.current) return;
    (stompClientRef.current as any).send('/app/topic.leave', {}, JSON.stringify({ topicName: joinedTopic, username }));
    if (topicSubscriptionRef.current) {
      topicSubscriptionRef.current.unsubscribe();
      topicSubscriptionRef.current = null;
    }
    setJoinedTopic(null);
    setTopicMessages([]);
  };

  // Create a dynamic topic
  const createTopic = () => {
    const trimmedTopic = topicName.trim();
    if (!trimmedTopic || !username.trim()) {
      alert('Please enter a topic name and username');
      return;
    }
    if (!stompClientRef.current) {
      alert('Please connect first');
      return;
    }
    (stompClientRef.current as any).send('/app/topic.create', {}, JSON.stringify({ topicName: trimmedTopic, username }));
    // Auto-join after create
    subscribeToDynamicTopic(trimmedTopic);
    setJoinedTopic(trimmedTopic);
  };

  // Send message to dynamic topic
  const sendTopicMessage = () => {
    if (!currentMessage.trim() || !joinedTopic || !stompClientRef.current) return;
    (stompClientRef.current as any).send(
      '/app/topic.sendMessage',
      {},
      JSON.stringify({
        topicName: joinedTopic,
        sender: username,
        content: currentMessage,
      })
    );
    setCurrentMessage('');
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
    setMessages((prevMessages) => {
      const next = [...prevMessages, messageWithTimestamp];
      return next.length > 100 ? next.slice(next.length - 100) : next;
    });
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
      <div key={index} className={`${styles.message} ${styles[message.type?.toLowerCase?.()] || ''}`}>
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
          <>
            {/* Dynamic Topic Controls */}
            <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Topic name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                style={{ flex: 1, padding: 4 }}
                disabled={!!joinedTopic}
              />
              <button onClick={createTopic} disabled={!!joinedTopic || !topicName.trim()}>
                Create Topic
              </button>
              <button onClick={joinTopic} disabled={!!joinedTopic || !topicName.trim()}>
                Join Topic
              </button>
              <button onClick={leaveTopic} disabled={!joinedTopic}>
                Leave Topic
              </button>
            </div>

            {/* Show joined topic */}
            {joinedTopic && (
              <div style={{ marginBottom: 8 }}>
                <strong>Joined topic:</strong> {joinedTopic}
              </div>
            )}

            {/* Chat Areas */}
            <div className={styles.chatArea}>
              {/* Public chat */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Public Chat</div>
                <div ref={messageAreaRef} className={styles.chatMessages} style={{ maxHeight: 120, overflowY: 'auto' }}>
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
                    disabled={!!joinedTopic}
                  />
                  <button className={styles.sendButton} onClick={sendMessage} disabled={!currentMessage.trim() || !!joinedTopic}>
                    Send
                  </button>
                  {/* <button
                    onClick={() => {
                      const chatMessage: ChatMessage = {
                        sender: username,
                        content: 'Test message from Nhân to class A1',
                        type: 'CHAT',
                      };
                      (stompClientRef.current as any).send('/app/chat.sendMessage.classA1', {}, JSON.stringify(chatMessage));
                    }}
                    disabled={!!joinedTopic}
                  >
                    Send to class A1
                  </button> */}
                </div>
              </div>

              {/* Dynamic topic chat */}
              {joinedTopic && (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Topic: {joinedTopic}</div>
                  <div ref={messageAreaRef} className={styles.chatMessages} style={{ maxHeight: 120, overflowY: 'auto' }}>
                    {topicMessages.map((message, index) => renderMessage(message, index))}
                  </div>
                  <div className={styles.chatInput}>
                    <input
                      type="text"
                      className={styles.messageInput}
                      placeholder={`Message to ${joinedTopic}...`}
                      maxLength={500}
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') sendTopicMessage();
                      }}
                    />
                    <button className={styles.sendButton} onClick={sendTopicMessage} disabled={!currentMessage.trim()}>
                      Send to Topic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
