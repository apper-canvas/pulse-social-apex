import { motion } from 'framer-motion';
import PostFeed from '@/components/organisms/PostFeed';
import UserList from '@/components/organisms/UserList';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <PostFeed showComposer={true} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Welcome to Pulse Social
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with friends, share your moments, and discover amazing content from people around the world.
              </p>
            </div>

            <UserList title="People you may know" limit={3} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {['#TechTalk', '#Photography', '#Travel', '#Design', '#Wellness'].map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-sm text-primary hover:text-secondary cursor-pointer transition-colors duration-200"
                  >
                    <span className="font-medium">{topic}</span>
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

export default Home;