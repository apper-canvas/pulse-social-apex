import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { followService, userService } from '@/services';

const UserCard = ({ user, isFollowing: initialFollowing = false, onFollowChange, showFollowButton = true }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      if (isFollowing) {
        await followService.unfollow(1, user.Id); // Using user ID 1 as current user for demo
        await userService.updateFollowerCount(user.Id, -1);
        toast.success(`Unfollowed ${user.displayName}`);
      } else {
        await followService.follow(1, user.Id);
        await userService.updateFollowerCount(user.Id, 1);
        toast.success(`Now following ${user.displayName}`);
      }
      
      setIsFollowing(!isFollowing);
      
      if (onFollowChange) {
        onFollowChange(user.Id, !isFollowing);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update follow status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start space-x-3">
        <Avatar
          src={user.avatarUrl}
          alt={user.displayName}
          size="large"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <Text variant="h5" className="truncate">
                {user.displayName}
              </Text>
              <Text variant="small" color="gray-600" className="truncate">
                @{user.username}
              </Text>
            </div>
            
            {showFollowButton && (
              <Button
                variant={isFollowing ? "secondary" : "primary"}
                size="small"
                onClick={handleFollow}
                loading={loading}
                className="flex-shrink-0 ml-3"
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>
          
          {user.bio && (
            <Text variant="small" color="gray-700" className="mt-2 leading-relaxed break-words">
              {user.bio}
            </Text>
          )}
          
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <span>
              <span className="font-semibold text-gray-900">{user.followersCount || 0}</span> followers
            </span>
            <span>
              <span className="font-semibold text-gray-900">{user.followingCount || 0}</span> following
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;