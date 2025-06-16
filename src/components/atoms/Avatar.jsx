import { motion } from 'framer-motion';
import { useState } from 'react';

const Avatar = ({
  src,
  alt = '',
  size = 'medium',
  className = '',
  onClick,
  online = false,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const avatarClasses = `
    ${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const fallbackClasses = `
    ${sizes[size]} rounded-full bg-gradient-to-r from-primary to-secondary
    flex items-center justify-center text-white font-medium ${textSizes[size]}
    border-2 border-white shadow-sm
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const handleImageError = () => {
    setImageError(true);
  };

  const content = imageError || !src ? (
    <div className={fallbackClasses} onClick={onClick} {...props}>
      {getInitials(alt)}
    </div>
  ) : (
    <motion.img
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      src={src}
      alt={alt}
      className={avatarClasses}
      onError={handleImageError}
      onClick={onClick}
      {...props}
    />
  );

  return (
    <div className="relative inline-block">
      {content}
      {online && (
        <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-success border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;