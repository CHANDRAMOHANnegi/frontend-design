"use client";
import { useState, useEffect, useRef } from 'react';

export default function ChatApp() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const connect = () => {
    if (!username.trim()) return;
    
    setIsConnecting(true);
    const websocket = new WebSocket(`wss://wonderful-transformation-production.up.railway.app/ws?username=${encodeURIComponent(username)}`);

    // const websocket = new WebSocket(`ws://localhost:8080/ws?username=${encodeURIComponent(username)}`);
    
    websocket.onopen = () => {
      console.log('Connected to chat server');
      setWs(websocket);
      setIsConnected(true);
      setIsConnecting(false);
    };

    websocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, {
        id: msg.id || Date.now().toString(),
        username: msg.username,
        content: msg.content,
        time: msg.time || new Date().toLocaleTimeString()
      }]);
    };

    websocket.onclose = () => {
      console.log('Disconnected from chat server');
      setWs(null);
      setIsConnected(false);
      setIsConnecting(false);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnecting(false);
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

    const msg = {
      id: Date.now().toString(),
      content: message,
      time: new Date().toLocaleTimeString()
    };

    ws.send(JSON.stringify(msg));
    setMessage('');
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Simple Chat App</h1>
          <p className="text-blue-100">
            {isConnected ? `Connected as ${username}` : 'Not connected'}
          </p>
        </div>

        {/* Connection Form */}
        {!isConnected && (
          <div className="p-6 border-b">
            <div className="flex gap-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && connect()}
                disabled={isConnecting}
              />
              <button
                onClick={connect}
                disabled={!username.trim() || isConnecting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              {isConnected ? 'No messages yet. Start the conversation!' : 'Connect to start chatting'}
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex flex-col">
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.username === username
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 text-gray-800 self-start'
                }`}>
                  {msg.username !== username && (
                    <div className="text-xs font-semibold mb-1 text-gray-600">
                      {msg.username}
                    </div>
                  )}
                  <div>{msg.content}</div>
                  <div className={`text-xs mt-1 ${
                    msg.username === username ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {isConnected && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
            <button
              onClick={disconnect}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Connection Status */}
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-600">
          Status: {isConnected ? (
            <span className="text-green-600 font-semibold">Connected</span>
          ) : isConnecting ? (
            <span className="text-yellow-600 font-semibold">Connecting...</span>
          ) : (
            <span className="text-red-600 font-semibold">Disconnected</span>
          )}
        </div>
      </div>
    </div>
  );
}