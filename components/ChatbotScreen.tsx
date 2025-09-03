import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { PaperPlane } from './Icons';

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      role: 'model',
      text: language === 'en' 
        ? 'Hello! I am Ulinzi, your AI safety assistant. How can I help you today? You can ask for safety tips, legal help, or counselling.' 
        : 'Habari! Mimi ni Ulinzi, msaidizi wako wa usalama. Ninawezaje kukusaidia leo? Unaweza kuuliza vidokezo vya usalama, msaada wa kisheria, au ushauri nasaha.'
    };
    setMessages([welcomeMessage]);
  }, [language]);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatbotResponse(input, language, messages);
    
    const modelMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleLanguageToggle = () => {
      setLanguage(prev => prev === 'en' ? 'sw' : 'en');
      setMessages([]);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-black/10">
        <h2 className="text-2xl font-bold text-[#4A41C3]">AI Support Chat</h2>
        <div className="flex items-center space-x-2 bg-black/10 rounded-full p-1">
            <button onClick={handleLanguageToggle} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'en' ? 'bg-[#4A41C3] text-white' : 'text-black/70'}`}>EN</button>
            <button onClick={handleLanguageToggle} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'sw' ? 'bg-[#4A41C3] text-white' : 'text-black/70'}`}>SW</button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-[#4A41C3] text-white rounded-br-none' : 'bg-gray-200 text-black/90 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black/90 rounded-2xl rounded-bl-none px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#4A41C3] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#4A41C3] rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-[#4A41C3] rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center bg-gray-200 rounded-full p-2 border border-black/20">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={language === 'en' ? 'Type your message...' : 'Andika ujumbe wako...'}
          className="flex-grow bg-transparent text-black placeholder-black/50 focus:outline-none px-3"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ''}
          className="bg-[#4A41C3] rounded-full p-2 disabled:bg-black/20 disabled:cursor-not-allowed transition-colors"
        >
          <PaperPlane className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotScreen;