// WebSocket Message Types
export type MessageType = 'CHAT' | 'JOIN' | 'LEAVE';

// Chat Message Interface
export interface ChatMessage {
  sender: string;
  content: string;
  type: MessageType;
  timestamp?: string;
}

// Connection Status
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

// STOMP Client Interface
export interface StompClient {
  connect: (headers: Record<string, string>, connectCallback: (frame: string) => void, errorCallback?: (error: string) => void) => void;
  disconnect: () => void;
  send: (destination: string, headers: Record<string, string>, body: string) => void;
  subscribe: (destination: string, callback: (message: { body: string }) => void) => void;
  debug: (() => void) | null;
}
