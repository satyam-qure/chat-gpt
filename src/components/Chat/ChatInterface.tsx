import { useState, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isNew: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoggedIn: boolean;
}



// Add this new component for typewriter effect
const TypewriterText = ({ content }: { content: string }) => {
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    setDisplayedContent(""); // Reset when content changes
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [content]);

  return <span>{displayedContent}</span>;
};

const ChatInterface = ({ messages, onSendMessage, isLoggedIn }: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.role === 'assistant' && message.isNew ? (
                <TypewriterText content={message.content} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={!isLoggedIn}
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 