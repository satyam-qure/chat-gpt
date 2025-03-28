import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ChatInterface from '@/components/Chat/ChatInterface';
import ConversationList from '@/components/Chat/ConversationList';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isNew: boolean;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const { isAuthenticated: isLoggedIn } = useAuth();

  useEffect(()=>{
    if(!isLoggedIn){
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    // Load conversations from localStorage or state management
    const storedConversations = localStorage.getItem('conversations');
    if (storedConversations) {
      const parsedConversations = JSON.parse(storedConversations);
      setConversations(parsedConversations);
      
      // Find the active conversation based on the URL id
      const currentConversation = parsedConversations.find(
        (conv: Conversation) => conv.id === id
      );
      setActiveConversation(currentConversation || null);
    }
  }, [id]);

  const handleNewConversation = () => {
    console.log('new conversation');
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

  const handleSendMessage = async (message: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      isNew: true,
    };

    // Update conversation with user message
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation.id) {
        const updatedConv = {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          timestamp: new Date().toLocaleString(),
        };
        setActiveConversation(updatedConv);
        return updatedConv;
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...activeConversation.messages,
            { role: 'user', content: message },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      
      if (!data.message) {
        throw new Error('Invalid response from API');
      }
      
      // Add assistant's response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        role: 'assistant',
        isNew: true,
      };

      const finalConversations = updatedConversations.map((conv) => {
        if (conv.id === activeConversation.id) {
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, assistantMessage],
            lastMessage: assistantMessage.content,
            timestamp: new Date().toLocaleString(),
          };
          setActiveConversation(updatedConv);
          return updatedConv;
        }
        return conv;
      });

      setConversations(finalConversations);
      localStorage.setItem('conversations', JSON.stringify(finalConversations));
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Add error message to conversation
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        role: 'assistant',
        isNew: true,
      };

      const errorConversations = updatedConversations.map((conv) => {
        if (conv.id === activeConversation.id) {
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, errorMessage],
            lastMessage: errorMessage.content,
            timestamp: new Date().toLocaleString(),
          };
          setActiveConversation(updatedConv);
          return updatedConv;
        }
        return conv;
      });

      setConversations(errorConversations);
      localStorage.setItem('conversations', JSON.stringify(errorConversations));
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
      <div className={`${activeConversation ? 'hidden' : 'flex'} md:flex md:w-80 h-full overflow-hidden`}>
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversation?.id || null}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isLoggedIn={isLoggedIn}
        />
      </div>
     {isLoggedIn ? (
        <div className="flex-1 h-full relative">
          {activeConversation ? (
            <>
              <button 
                onClick={() => setActiveConversation(null)}
                className="md:hidden absolute top-4 left-4 z-10 bg-gray-100 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <ChatInterface
                messages={activeConversation.messages}
                onSendMessage={handleSendMessage}
                isLoggedIn={isLoggedIn}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a conversation or start a new one</p>
            </div>
          )}
        </div>
      ) : (
        <div className='flex items-center justify-center h-full flex-1'>
          Please Login to continue
        </div>
      )}
    </div>
  );
};

export default ChatPage; 