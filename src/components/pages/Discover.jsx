import { motion } from 'framer-motion';
import UserList from '@/components/organisms/UserList';
import SearchBar from '@/components/molecules/SearchBar';
import PostFeed from '@/components/organisms/PostFeed';
import Text from '@/components/atoms/Text';

const Discover = () => {
  const handleUserSelect = (user) => {
    console.log('Selected user:', user);
    // Here you could navigate to the user's profile or add them to a list
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Text variant="h2" className="mb-4">
                Discover
              </Text>
              <Text variant="body" color="gray-600" className="mb-6">
                Find new people to connect with and explore trending content.
              </Text>
              
              <SearchBar 
                onUserSelect={handleUserSelect}
                placeholder="Search for people to follow..."
              />
            </div>

            {/* Trending Posts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Text variant="h3" className="mb-4">
                Trending Posts
              </Text>
              <PostFeed showComposer={false} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Users */}
            <UserList title="Suggested for you" />

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Text variant="h4" className="mb-4">
                Popular Categories
              </Text>
              <div className="space-y-3">
                {[
                  { name: 'Technology', count: '1.2k posts' },
                  { name: 'Photography', count: '856 posts' },
                  { name: 'Travel', count: '623 posts' },
                  { name: 'Design', count: '445 posts' },
                  { name: 'Food', count: '389 posts' },
                  { name: 'Music', count: '267 posts' }
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div>
                      <Text variant="small" weight="medium">
                        {category.name}
                      </Text>
                      <Text variant="caption" color="gray-500">
                        {category.count}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Text variant="h4" className="mb-4">
                Recent Activity
              </Text>
              <div className="space-y-3">
                {[
                  'Sarah liked your post',
                  'Mike started following you',
                  'Elena commented on your photo',
                  'David shared your post'
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-sm text-gray-600 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    {activity}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Discover;