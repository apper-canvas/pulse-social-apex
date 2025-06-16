import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PostCard from '@/components/molecules/PostCard';
import PostComposer from '@/components/molecules/PostComposer';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import { postService, userService } from '@/services';

const PostFeed = ({ showComposer = true }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeed();
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await userService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to load current user:', error);
    }
  };

  const loadFeed = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [postsData, usersData] = await Promise.all([
        postService.getFeed(),
        userService.getAll()
      ]);
      
      setPosts(postsData);
      
      // Create users lookup map
      const usersMap = {};
      usersData.forEach(user => {
        usersMap[user.Id] = user;
      });
      setUsers(usersMap);
    } catch (err) {
      setError(err.message || 'Failed to load feed');
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post.Id === updatedPost.Id ? updatedPost : post
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {showComposer && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <SkeletonLoader count={1} height="120px" />
          </div>
        )}
        <SkeletonLoader count={3} height="300px" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={loadFeed}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <div className="space-y-6">
        {showComposer && currentUser && (
          <PostComposer 
            onPostCreated={handlePostCreated}
            currentUser={currentUser}
          />
        )}
        <EmptyState 
          title="No posts yet"
          description="Be the first to share something with the community!"
          actionLabel="Create Post"
          onAction={() => {
            // Focus on composer if available
            const composer = document.querySelector('textarea');
            if (composer) composer.focus();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {showComposer && currentUser && (
        <PostComposer 
          onPostCreated={handlePostCreated}
          currentUser={currentUser}
        />
      )}
      
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostCard 
              post={post}
              user={users[post.userId]}
              onPostUpdate={handlePostUpdate}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PostFeed;