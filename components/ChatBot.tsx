
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { GeminiService } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello Shiki boo! Ask me anything about love or just chat with me. ❤️' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await GeminiService.chat([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl w-full max-w-md border border-pink-100 flex flex-col h-[400px]">
      <h3 className="text-pink-600 font-romantic text-2xl mb-4 border-b border-pink-100 pb-2">Love Messenger</h3>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin scrollbar-thumb-pink-200"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-pink-500 text-white rounded-br-none' 
                : 'bg-pink-100 text-pink-800 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-pink-100 text-pink-400 px-4 py-2 rounded-2xl animate-pulse text-sm">Thinking...</div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-pink-50 border border-pink-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-300"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition-colors disabled:bg-pink-300"
        >
          <i className="fa-solid fa-paper-plane px-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
