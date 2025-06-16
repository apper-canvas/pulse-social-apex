import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/atoms/Input';
import UserCard from '@/components/molecules/UserCard';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services';

const SearchBar = ({ onUserSelect, placeholder = "Search for people..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await userService.searchByUsername(query);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleUserSelect = (user) => {
    setQuery('');
    setShowResults(false);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const handleBlur = () => {
    // Delay hiding results to allow clicks
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        icon="Search"
        iconPosition="left"
        className="w-full"
      />
      
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center">
                <ApperIcon name="Loader2" size={20} className="animate-spin mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2 space-y-2">
                {results.map((user) => (
                  <motion.div
                    key={user.Id}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="p-2 rounded-lg cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    <UserCard user={user} showFollowButton={false} />
                  </motion.div>
                ))}
              </div>
            ) : query.trim().length >= 2 ? (
              <div className="p-4 text-center">
                <ApperIcon name="UserX" size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No users found</p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;