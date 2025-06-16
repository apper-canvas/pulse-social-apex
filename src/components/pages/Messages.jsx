import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services';

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await userService.getAll();
      setUsers(usersData);
      if (usersData.length > 0) {
        setSelectedUser(usersData[0]);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockConversations = [
    {
      id: 1,
      userId: 2,
      lastMessage: "Hey! How's your new project going?",
      timestamp: "2 min ago",
      unread: true
    },
    {
      id: 2,
      userId: 3,
      lastMessage: "The photos from our trip are amazing! 📸",
      timestamp: "1 hour ago",
      unread: false
    },
    {
      id: 3,
      userId: 4,
      lastMessage: "Thanks for the coding tips yesterday",
      timestamp: "3 hours ago",
      unread: false
    },
    {
      id: 4,
      userId: 5,
      lastMessage: "See you at yoga class tomorrow! 🧘‍♀️",
      timestamp: "1 day ago",
      unread: true
    }
  ];

  const mockMessages = [
    {
      id: 1,
      senderId: 2,
      content: "Hey! How's your new project going?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      senderId: 1,
      content: "It's going great! Just finished the UI mockups. Want to see?",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      senderId: 2,
      content: "Absolutely! I'd love to give you some feedback",
      timestamp: "10:33 AM",
      isOwn: false
    },
    {
      id: 4,
      senderId: 1,
      content: "Perfect! I'll send them over in a few minutes",
      timestamp: "10:35 AM",
      isOwn: true
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message to the server
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.Id === userId);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <ApperIcon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gray-100"
    >
      <div className="h-full max-w-7xl mx-auto flex">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Text variant="h3">Messages</Text>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conversation) => {
              const user = getUserById(conversation.userId);
              if (!user) return null;
              
              return (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                    selectedUser?.Id === user.Id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar
                        src={user.avatarUrl}
                        alt={user.displayName}
                        size="medium"
                        online={Math.random() > 0.5} // Random online status for demo
                      />
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Text variant="small" weight="semibold" className="truncate">
                          {user.displayName}
                        </Text>
                        <Text variant="caption" color="gray-500">
                          {conversation.timestamp}
                        </Text>
                      </div>
                      <Text 
                        variant="caption" 
                        color={conversation.unread ? "gray-900" : "gray-500"}
                        weight={conversation.unread ? "medium" : "normal"}
                        className="truncate"
                      >
                        {conversation.lastMessage}
                      </Text>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex md:flex-1 flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center space-x-3">
                <Avatar
                  src={selectedUser.avatarUrl}
                  alt={selectedUser.displayName}
                  size="medium"
                  online={true}
                />
                <div>
                  <Text variant="small" weight="semibold">
                    {selectedUser.displayName}
                  </Text>
                  <Text variant="caption" color="success">
                    Online
                  </Text>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {mockMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.isOwn 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <Text variant="small" className="break-words">
                        {msg.content}
                      </Text>
                      <Text 
                        variant="caption" 
                        className={`mt-1 block ${msg.isOwn ? 'text-primary-200' : 'text-gray-500'}`}
                      >
                        {msg.timestamp}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white p-4 border-t border-gray-200">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="resize-none"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    icon="Send"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <ApperIcon name="MessageCircle" size={64} className="mx-auto text-gray-300 mb-4" />
                <Text variant="h4" color="gray-500">
                  Select a conversation
                </Text>
                <Text variant="body" color="gray-400">
                  Choose someone to start messaging
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;