import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Custom class
   */
  className?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Disabled
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const isDisabled = disabled && 'button-disabled';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode, isDisabled, className].join(' ')}
      style={{ backgroundColor }}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
