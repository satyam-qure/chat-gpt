import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ConversationList from '@/components/Chat/ConversationList';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const Dashboard = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load conversations from localStorage
    const storedConversations = localStorage.getItem('conversations');
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  const handleNewConversation = () => {
    console.log("test")
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      lastMessage: '',
      timestamp: new Date().toLocaleString(),
      messages: [],
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    router.push(`/dashboard/chat/${newConversation.id}`);
  };

  const handleSelectConversation = (conversationId: string) => {
    router.push(`/dashboard/chat/${conversationId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please sign in to access the dashboard.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-80 flex flex-col h-full overflow-hidden">
        <ConversationList
          conversations={conversations}
          activeConversationId={null}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isLoggedIn={isAuthenticated}
        />
      </div>
      <div className="flex-1 h-full flex items-center justify-center text-gray-500">
        <p>Select a conversation or start a new one</p>
      </div>
    </div>
  );
};

export default Dashboard;
