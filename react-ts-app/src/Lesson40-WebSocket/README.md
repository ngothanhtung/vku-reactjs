# WebSocket Chat Component

Đây là một React TypeScript component được chuyển đổi từ HTML/JavaScript nguyên bản để tạo ra một ứng dụng chat realtime sử dụng WebSocket với STOMP protocol.

## Cài đặt

Trước khi sử dụng component này, bạn cần cài đặt các dependencies sau:

```bash
npm install sockjs-client stompjs
npm install --save-dev @types/sockjs-client @types/stompjs
```

## Sử dụng

```typescript
import React from 'react';
import { Chat } from './Lesson40-WebSocket';

function App() {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
```

## Tính năng

- **Real-time messaging**: Gửi và nhận tin nhắn trong thời gian thực
- **User join/leave notifications**: Thông báo khi người dùng tham gia hoặc rời khỏi chat
- **Connection status**: Hiển thị trạng thái kết nối (Connected/Disconnected/Connecting)
- **Message timestamps**: Thời gian gửi tin nhắn
- **Responsive design**: Giao diện tương thích với mobile và desktop
- **TypeScript support**: Hỗ trợ đầy đủ TypeScript với type safety

## Cấu trúc Component

### Files

- `Chat.tsx` - Component chính
- `Chat.module.css` - Styles cho component
- `types.ts` - TypeScript type definitions
- `index.tsx` - Export file

### Types

```typescript
// Message types
export type MessageType = 'CHAT' | 'JOIN' | 'LEAVE';

// Chat message structure
export interface ChatMessage {
  sender: string;
  content: string;
  type: MessageType;
  timestamp?: string;
}

// Connection status
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
```

## Backend Requirements

Component này cần một WebSocket server hỗ trợ STOMP protocol với các endpoints sau:

- **Connection endpoint**: `/ws`
- **Subscribe topic**: `/topic/public`
- **Send message**: `/app/chat.sendMessage`
- **Add user**: `/app/chat.addUser`

### Spring Boot Example

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }
}
```

## Customization

### Styling

Bạn có thể custom styles bằng cách override CSS classes trong `Chat.module.css`:

```css
.chatContainer {
  max-width: 1000px; /* Thay đổi width */
}

.chatHeader {
  background-color: #28a745; /* Thay đổi màu header */
}
```

### Message Format

Để thay đổi format message, bạn có thể modify function `renderMessage` trong `Chat.tsx`.

## Features Comparison

| Feature | Original HTML/JS | React TypeScript |
|---------|------------------|------------------|
| Real-time messaging | ✅ | ✅ |
| Type safety | ❌ | ✅ |
| Component reusability | ❌ | ✅ |
| Modern React patterns | ❌ | ✅ |
| CSS Modules | ❌ | ✅ |
| State management | DOM manipulation | React hooks |
| Error handling | Basic | Enhanced |

## Notes

- Component sử dụng React hooks (useState, useEffect, useRef) để quản lý state
- WebSocket connection được cleanup tự động khi component unmount
- Messages tự động scroll to bottom khi có tin nhắn mới
- Hỗ trợ keyboard shortcuts (Enter để send message hoặc connect)
- Validation input (username và message không được rỗng)
