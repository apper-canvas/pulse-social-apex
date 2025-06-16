const Text = ({
  children,
  variant = 'body',
  size,
  weight,
  color = 'gray-900',
  className = '',
  as: Component = 'p',
  ...props
}) => {
  const variants = {
    display: 'font-display text-4xl lg:text-5xl font-bold leading-tight',
    h1: 'font-display text-3xl lg:text-4xl font-bold leading-tight',
    h2: 'font-display text-2xl lg:text-3xl font-semibold leading-tight',
    h3: 'font-display text-xl lg:text-2xl font-semibold leading-tight',
    h4: 'font-display text-lg lg:text-xl font-semibold leading-tight',
    h5: 'font-display text-base lg:text-lg font-semibold leading-tight',
    h6: 'font-display text-sm lg:text-base font-semibold leading-tight',
    body: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    small: 'text-sm leading-relaxed',
    caption: 'text-xs leading-normal',
    overline: 'text-xs uppercase tracking-wider font-medium'
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl'
  };

  const weights = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  const textClasses = `
    text-${color}
    ${variants[variant] || variants.body}
    ${size ? sizes[size] : ''}
    ${weight ? weights[weight] : ''}
    ${className}
  `;

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

export default Text;