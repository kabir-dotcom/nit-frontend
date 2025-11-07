import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { sendChatMessage } from '../utils/api';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I’m your Natural Immunotherapy assistant.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const container = messagesRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { role: 'user', content: trimmed };
    const placeholderId = `assistant-${Date.now()}`;
    const conversation = [...messages, userMessage];

    setMessages(prev => [
      ...prev,
      userMessage,
      { role: 'assistant', content: 'Thinking...', id: placeholderId },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await sendChatMessage({ messages: conversation });
      const botReply = data.reply || 'Thanks for your message!';

      setMessages(prev =>
        prev.map(message =>
          message.id === placeholderId ? { ...message, content: botReply } : message
        )
      );
    } catch (error) {
      console.error('Chatbot fetch error:', error);
      setMessages(prev =>
        prev.map(message =>
          message.id === placeholderId
            ? {
                ...message,
                content: '⚠️ Sorry, I couldn’t connect. Please try again later.',
              }
            : message
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 z-40 flex h-[400px] w-80 flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
          <header className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
            <p className="text-sm font-semibold">NIT AI Chat</p>
            <button
              type="button"
              onClick={toggleChat}
              aria-label="Close chat"
              className="rounded-full p-1 transition hover:bg-emerald-500/30"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto bg-emerald-50 px-4 py-4 text-sm text-slate-800"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-800 shadow ring-1 ring-emerald-100'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-emerald-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-xl border border-emerald-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
