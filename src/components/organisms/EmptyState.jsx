import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  title = "Nothing here yet",
  description = "Get started by creating your first item.",
  actionLabel,
  onAction,
  icon = "Inbox",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-12 px-4 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"
        >
          <ApperIcon name={icon} size={32} className="text-gray-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <Text variant="h4" className="mb-2">
          {title}
        </Text>
        
        <Text variant="body" color="gray-600" className="mb-6">
          {description}
        </Text>

        {actionLabel && onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              variant="primary"
              onClick={onAction}
              icon="Plus"
              className="inline-flex"
            >
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;