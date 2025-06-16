import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder = '',
  error,
  icon,
  iconPosition = 'left',
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value ? value.length > 0 : false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const inputClasses = `
    w-full px-4 py-3 text-gray-900 placeholder-transparent border rounded-lg 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
    ${error ? 'border-error' : 'border-gray-300'}
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${className}
  `;

  const labelClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none
    ${isFocused || hasValue 
      ? 'top-2 text-xs text-primary font-medium' 
      : 'top-3 text-gray-500'
    }
    ${icon && iconPosition === 'left' ? 'left-10' : ''}
  `;

  return (
    <div className="relative">
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-3 z-10">
            <ApperIcon 
              name={icon} 
              size={20} 
              className={`transition-colors duration-200 ${
                isFocused ? 'text-primary' : 'text-gray-400'
              }`} 
            />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />

        {label && (
          <motion.label
            initial={false}
            animate={{
              top: isFocused || hasValue ? '0.5rem' : '0.75rem',
              fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
              color: isFocused ? '#4F46E5' : error ? '#EF4444' : '#6B7280'
            }}
            className={labelClasses}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </motion.label>
        )}

        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-3 z-10">
            <ApperIcon 
              name={icon} 
              size={20} 
              className={`transition-colors duration-200 ${
                isFocused ? 'text-primary' : 'text-gray-400'
              }`} 
            />
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error flex items-center"
        >
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;