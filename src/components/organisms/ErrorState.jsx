import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const ErrorState = ({ 
  message = "Something went wrong",
  description = "We encountered an error while loading this content.",
  onRetry,
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
        <div className="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertTriangle" size={32} className="text-error" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <Text variant="h4" className="mb-2">
          {message}
        </Text>
        
        <Text variant="body" color="gray-600" className="mb-6">
          {description}
        </Text>

        {onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              variant="primary"
              onClick={onRetry}
              icon="RotateCcw"
              className="inline-flex"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ErrorState;