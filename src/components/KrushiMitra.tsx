import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, MessageSquare, Loader2, Send } from 'lucide-react';

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const KrushiMitra = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'नमस्कार! मी कृषिमित्र आहे. मी तुम्हाला ट्रॅक्टर आणि अवजारे निवडण्यात कशी मदत करू शकतो? (Hello! I am KrushiMitra. How can I help you select tractors and implements?)' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API Error');
      }

      setMessages(prev => [...prev, { role: 'model', text: data.text || 'Sorry, I could not generate a response.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'I encountered an error connecting to the server.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'mr-IN'; // Default to Marathi
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsTyping(true); // Indicate listening
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsTyping(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsTyping(false);
    };
    
    recognition.onend = () => {
      setIsTyping(false);
    };

    recognition.start();
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#003629] text-[#fdbe50] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 group"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#003629] opacity-30 animate-ping"></span>
        <Mic className="w-8 h-8 relative z-10" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] z-50 border border-[#dae5dc]">
      <div className="bg-[#003629] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#fdbe50]" />
          <h3 className="font-bold">KrushiMitra AI</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#f1fcf2]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#003629] text-white rounded-tr-none' : 'bg-white border border-[#dae5dc] text-[#141e18] rounded-tl-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#dae5dc] p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-2 h-2 bg-[#003629]/40 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[#003629]/60 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-[#003629]/80 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 bg-white border-t border-[#dae5dc] flex gap-2">
        <button 
          onClick={handleVoiceInput}
          className="p-2 bg-[#e5f1e7] text-[#003629] rounded-full hover:bg-[#dae5dc] transition-colors"
          title="Speak"
        >
          <Mic className="w-5 h-5" />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask KrushiMitra..."
          className="flex-1 bg-[#ebf7ed] rounded-full px-4 outline-none text-sm"
        />
        <button 
          onClick={() => handleSend(input)}
          className="p-2 bg-[#fdbe50] text-[#281900] rounded-full hover:bg-[#7e5700] hover:text-white transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
