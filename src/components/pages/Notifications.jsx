import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import { userService } from '@/services';

const Notifications = () => {
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
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      userId: 2,
      content: 'liked your post',
      postContent: 'Just finished designing a new mobile app interface!',
      timestamp: '2024-01-20T11:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      userId: 3,
      content: 'commented on your post',
      postContent: 'Just finished designing a new mobile app interface!',
      commentContent: 'This looks amazing! Great work on the color scheme.',
      timestamp: '2024-01-20T10:45:00Z',
      read: false
    },
    {
      id: 3,
      type: 'follow',
      userId: 4,
      content: 'started following you',
      timestamp: '2024-01-19T16:20:00Z',
      read: true
    },
    {
      id: 4,
      type: 'like',
      userId: 5,
      content: 'liked your post',
      postContent: 'Coffee and creativity go hand in hand ☕',
      timestamp: '2024-01-19T14:15:00Z',
      read: true
    },
    {
      id: 5,
      type: 'comment',
      userId: 2,
      content: 'replied to your comment',
      postContent: 'Exciting news! Our startup just secured Series A funding!',
      commentContent: 'Thanks for the support! Couldn\'t have done it without friends like you.',
      timestamp: '2024-01-18T09:30:00Z',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { name: 'Heart', color: 'text-accent' };
      case 'comment':
        return { name: 'MessageCircle', color: 'text-primary' };
      case 'follow':
        return { name: 'UserPlus', color: 'text-secondary' };
      default:
        return { name: 'Bell', color: 'text-gray-400' };
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.Id === userId);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the notifications on the server
    console.log('Marking all notifications as read');
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SkeletonLoader count={5} height="100px" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <Text variant="h2">Notifications</Text>
            <Button
              variant="ghost"
              size="small"
              onClick={markAllAsRead}
              icon="Check"
            >
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {mockNotifications.map((notification, index) => {
            const user = getUserById(notification.userId);
            const icon = getNotificationIcon(notification.type);
            const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });

            if (!user) return null;

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200 ${
                  !notification.read ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar
                      src={user.avatarUrl}
                      alt={user.displayName}
                      size="medium"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white`}>
                      <ApperIcon name={icon.name} size={14} className={icon.color} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <Text variant="small" className="break-words">
                          <span className="font-semibold">{user.displayName}</span>
                          {' '}{notification.content}
                        </Text>
                        
                        {notification.postContent && (
                          <Text variant="caption" color="gray-600" className="mt-1 italic break-words">
                            "{notification.postContent}"
                          </Text>
                        )}
                        
                        {notification.commentContent && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <Text variant="caption" color="gray-700" className="break-words">
                              {notification.commentContent}
                            </Text>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Text variant="caption" color="gray-500">
                          {timeAgo}
                        </Text>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {notification.type === 'follow' && (
                      <div className="mt-3">
                        <Button variant="primary" size="small">
                          Follow back
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state for when there are no notifications */}
        {mockNotifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ApperIcon name="Bell" size={48} className="mx-auto text-gray-300 mb-4" />
            <Text variant="h4" color="gray-500" className="mb-2">
              No notifications yet
            </Text>
            <Text variant="body" color="gray-400">
              When people interact with your posts, you'll see notifications here.
            </Text>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;