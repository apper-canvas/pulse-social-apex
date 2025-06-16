import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { postService, userService } from '@/services';

const PostComposer = ({ onPostCreated, currentUser }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Please write something to share');
      return;
    }

    setLoading(true);
    try {
      const newPost = await postService.create({
        userId: currentUser?.Id || 1, // Default to user 1 for demo
        content: content.trim(),
        imageUrls: []
      });

      toast.success('Post shared successfully!');
      setContent('');
      setIsExpanded(false);
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      toast.error('Failed to share post');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setContent('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"
    >
      <div className="flex space-x-3">
        <Avatar
          src={currentUser?.avatarUrl}
          alt={currentUser?.displayName}
          size="medium"
        />
        
        <div className="flex-1">
          <motion.textarea
            initial={false}
            animate={{ height: isExpanded ? 120 : 48 }}
            transition={{ duration: 0.2 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            placeholder="What's on your mind?"
            className="w-full resize-none border-none outline-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed bg-transparent"
            style={{ minHeight: isExpanded ? '120px' : '48px' }}
          />

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="small"
                      icon="Image"
                      className="text-gray-600 hover:text-primary"
                    >
                      Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      icon="Smile"
                      className="text-gray-600 hover:text-primary"
                    >
                      Emoji
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      icon="MapPin"
                      className="text-gray-600 hover:text-primary"
                    >
                      Location
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={handleSubmit}
                      loading={loading}
                      disabled={!content.trim()}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PostComposer;