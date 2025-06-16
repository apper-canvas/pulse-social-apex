import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 1, height = "200px", className = "" }) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => index);

  const shimmerVariants = {
    initial: { backgroundPosition: "-200px 0" },
    animate: { 
      backgroundPosition: "calc(200px + 100%) 0",
      transition: {
        duration: 1.5,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {skeletonItems.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-4 overflow-hidden"
          style={{ height }}
        >
          <div className="animate-pulse space-y-4">
            {/* Header skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Image skeleton */}
            {height !== "80px" && height !== "120px" && (
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
                style={{
                  backgroundSize: "200px 100%",
                  backgroundRepeat: "no-repeat"
                }}
              />
            )}
            
            {/* Actions skeleton */}
            <div className="flex items-center space-x-6 pt-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;