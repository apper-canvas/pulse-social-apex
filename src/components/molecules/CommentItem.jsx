import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';
import { commentService } from '@/services';

const CommentItem = ({ comment, user }) => {
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const updatedComment = await commentService.toggleLike(comment.Id);
      setLikesCount(updatedComment.likesCount);
    } catch (error) {
      toast.error('Failed to like comment');
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex space-x-3 py-3"
    >
      <Avatar
        src={user?.avatarUrl}
        alt={user?.displayName}
        size="small"
      />
      
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-2 mb-1">
            <Text variant="small" weight="semibold" className="truncate">
              {user?.displayName}
            </Text>
            <Text variant="caption" color="gray-500">
              {timeAgo}
            </Text>
          </div>
          
          <Text variant="small" color="gray-900" className="leading-relaxed break-words">
            {comment.content}
          </Text>
        </div>
        
        <div className="flex items-center space-x-4 mt-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={loading}
            className="flex items-center space-x-1 text-gray-600 hover:text-accent transition-colors duration-200"
          >
            <ApperIcon name="Heart" size={14} />
            {likesCount > 0 && (
              <span className="text-xs font-medium">{likesCount}</span>
            )}
          </motion.button>
          
          <button className="text-xs text-gray-600 hover:text-primary transition-colors duration-200">
            Reply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentItem;