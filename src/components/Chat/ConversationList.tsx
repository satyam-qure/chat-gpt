interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isLoggedIn: boolean;
}

const ConversationList = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: ConversationListProps) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 border-r w-full">
      <div className="p-2 md:p-4 sticky top-0 bg-gray-50 z-10">
        <button
          onClick={()=> onNewConversation()}
          className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors text-sm md:text-base"
        >
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full text-left p-3 md:p-4 hover:bg-gray-100 transition-colors ${
              activeConversationId === conversation.id ? 'bg-gray-100' : ''
            }`}
          >
            <h3 className="font-medium truncate text-sm md:text-base">{conversation.title}</h3>
            <p className="text-xs md:text-sm text-gray-500 truncate">
              {conversation.lastMessage}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {conversation.timestamp}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList; 