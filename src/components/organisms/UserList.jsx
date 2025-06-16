import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import UserCard from '@/components/molecules/UserCard';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import { userService, followService } from '@/services';

const UserList = ({ title = "Suggested Users", limit }) => {
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
    loadFollowing();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const usersData = await userService.getAll();
      const displayUsers = limit ? usersData.slice(0, limit) : usersData;
      setUsers(displayUsers);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadFollowing = async () => {
    try {
      const followingData = await followService.getFollowingIds(1); // Using user ID 1 for demo
      setFollowingIds(followingData);
    } catch (error) {
      console.error('Failed to load following list:', error);
    }
  };

  const handleFollowChange = (userId, isNowFollowing) => {
    if (isNowFollowing) {
      setFollowingIds(prev => [...prev, userId]);
    } else {
      setFollowingIds(prev => prev.filter(id => id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <SkeletonLoader count={3} height="120px" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={loadUsers}
      />
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState 
        title="No users found"
        description="Check back later for new people to connect with"
      />
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {users.map((user, index) => (
          <motion.div
            key={user.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <UserCard 
              user={user}
              isFollowing={followingIds.includes(user.Id)}
              onFollowChange={handleFollowChange}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserList;