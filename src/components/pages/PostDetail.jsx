import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PostCard from '@/components/molecules/PostCard';
import CommentList from '@/components/organisms/CommentList';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { postService, userService } from '@/services';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const postData = await postService.getById(id);
      const userData = await userService.getById(postData.userId);
      
      setPost(postData);
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Failed to load post');
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setPost(updatedPost);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SkeletonLoader count={1} height="400px" />
          <div className="mt-6">
            <SkeletonLoader count={3} height="80px" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ErrorState 
            message={error}
            onRetry={loadPost}
          />
        </div>
      </div>
    );
  }

  if (!post || !user) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ErrorState 
            message="Post not found"
            description="The post you're looking for doesn't exist or has been removed."
          />
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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900"
          >
            Back
          </Button>
        </motion.div>

        {/* Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <PostCard 
            post={post}
            user={user}
            onPostUpdate={handlePostUpdate}
          />
        </motion.div>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <CommentList postId={post.Id} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostDetail;