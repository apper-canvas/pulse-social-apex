import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import CommentItem from '@/components/molecules/CommentItem';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import { commentService, userService, postService } from '@/services';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      loadComments();
      loadUsers();
    }
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const commentsData = await commentService.getByPostId(postId);
      setComments(commentsData);
    } catch (err) {
      setError(err.message || 'Failed to load comments');
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const usersData = await userService.getAll();
      const usersMap = {};
      usersData.forEach(user => {
        usersMap[user.Id] = user;
      });
      setUsers(usersMap);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      const comment = await commentService.create({
        postId: parseInt(postId, 10),
        userId: 1, // Using user ID 1 for demo
        content: newComment.trim()
      });

      // Update post comment count
      await postService.incrementCommentCount(postId);
      
      setComments(prev => [...prev, comment]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        <SkeletonLoader count={3} height="80px" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={loadComments}
      />
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-900">
        Comments ({comments.length})
      </h3>

      {/* Comment Input */}
      <div className="space-y-3">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write a comment..."
          className="w-full"
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="small"
            onClick={handleSubmitComment}
            loading={submitting}
            disabled={!newComment.trim()}
          >
            Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <EmptyState 
          title="No comments yet"
          description="Be the first to share your thoughts!"
          actionLabel="Write Comment"
          onAction={() => {
            const input = document.querySelector('input[placeholder="Write a comment..."]');
            if (input) input.focus();
          }}
        />
      ) : (
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {comments.map((comment, index) => (
            <motion.div
              key={comment.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CommentItem 
                comment={comment}
                user={users[comment.userId]}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CommentList;