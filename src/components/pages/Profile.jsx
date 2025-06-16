import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import PostCard from '@/components/molecules/PostCard';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import { userService, postService } from '@/services';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load current user and their posts
      const [userData, postsData] = await Promise.all([
        userService.getCurrentUser(),
        postService.getByUserId(1) // Using user ID 1 for demo
      ]);
      
      setUser(userData);
      setPosts(postsData);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post.Id === updatedPost.Id ? updatedPost : post
    ));
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'FileText', count: posts.length },
    { id: 'media', label: 'Photos', icon: 'Image', count: posts.filter(p => p.imageUrls?.length > 0).length },
    { id: 'likes', label: 'Likes', icon: 'Heart', count: posts.reduce((sum, p) => sum + p.likesCount, 0) }
  ];

  if (loading) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SkeletonLoader count={1} height="200px" />
          <div className="mt-6">
            <SkeletonLoader count={3} height="300px" />
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
            onRetry={loadProfile}
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <EmptyState 
            title="Profile not found"
            description="The profile you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const filteredPosts = activeTab === 'media' 
    ? posts.filter(post => post.imageUrls?.length > 0)
    : posts;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar
              src={user.avatarUrl}
              alt={user.displayName}
              size="2xl"
              className="flex-shrink-0"
            />
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <Text variant="h2" className="mb-1">
                    {user.displayName}
                  </Text>
                  <Text variant="body" color="gray-600">
                    @{user.username}
                  </Text>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <Button variant="secondary" icon="Settings">
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              {user.bio && (
                <Text variant="body" className="mb-4 break-words">
                  {user.bio}
                </Text>
              )}
              
              <div className="flex items-center justify-center sm:justify-start space-x-6 text-sm">
                <div className="text-center sm:text-left">
                  <span className="font-semibold text-gray-900">{user.followersCount || 0}</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="font-semibold text-gray-900">{user.followingCount || 0}</span>
                  <span className="text-gray-600 ml-1">following</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="font-semibold text-gray-900">{posts.length}</span>
                  <span className="text-gray-600 ml-1">posts</span>
                </div>
              </div>
              
              {user.joinedDate && (
                <div className="flex items-center justify-center sm:justify-start mt-4 text-sm text-gray-500">
                  <ApperIcon name="Calendar" size={16} className="mr-2" />
                  Joined {format(new Date(user.joinedDate), 'MMMM yyyy')}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-center transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ApperIcon name={tab.icon} size={20} />
                    <span className="font-medium">{tab.label}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'posts' || activeTab === 'media' ? (
            filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <PostCard 
                      post={post}
                      user={user}
                      onPostUpdate={handlePostUpdate}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState 
                title={activeTab === 'media' ? "No photos yet" : "No posts yet"}
                description={activeTab === 'media' ? "Share some photos to get started!" : "Share your first post with the community!"}
                actionLabel="Create Post"
                icon={activeTab === 'media' ? "Image" : "FileText"}
                onAction={() => {
                  // Navigate to home and focus composer
                  window.location.href = '/home';
                }}
              />
            )
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Text variant="h4" className="mb-4">Liked Posts</Text>
              <Text variant="body" color="gray-600">
                This feature is coming soon! You'll be able to see all the posts you've liked here.
              </Text>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;