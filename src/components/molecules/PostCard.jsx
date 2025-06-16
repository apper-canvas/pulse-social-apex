import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { postService, userService } from '@/services';

const PostCard = ({ post, user, onPostUpdate }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Optimistic update
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      
      const updatedPost = await postService.toggleLike(post.Id, 1); // Using user ID 1 for demo
      
      // Update with server response
      setIsLiked(updatedPost.isLiked);
      setLikesCount(updatedPost.likesCount);
      
      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      // Revert optimistic update
      setIsLiked(isLiked);
      setLikesCount(likesCount);
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  const handleComment = () => {
    navigate(`/post/${post.Id}`);
  };

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar
            src={user?.avatarUrl}
            alt={user?.displayName}
            size="medium"
            onClick={() => navigate('/profile')}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {user?.displayName}
              </h3>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            <p className="text-sm text-gray-600">@{user?.username}</p>
          </div>
          <Button variant="ghost" size="small" className="p-2">
            <ApperIcon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap break-words">
          {post.content}
        </p>
      </div>

      {/* Post Images */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="px-4 pb-3">
          <div className="grid gap-2">
            {post.imageUrls.map((imageUrl, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-auto object-cover max-h-96"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isLiked ? 'text-accent' : 'text-gray-600 hover:text-accent'
              }`}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ApperIcon 
                  name={isLiked ? "Heart" : "Heart"} 
                  size={20} 
                  className={isLiked ? "fill-current" : ""}
                />
              </motion.div>
              <span className="text-sm font-medium">{likesCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComment}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <ApperIcon name="MessageCircle" size={20} />
              <span className="text-sm font-medium">{post.commentsCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors duration-200"
            >
              <ApperIcon name="Share" size={20} />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ApperIcon name="Bookmark" size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;