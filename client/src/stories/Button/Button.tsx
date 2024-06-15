import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import './button.scss';

type ButtonType = 'button' | 'submit';

interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    type?: ButtonType;
    className?: string;
    children?: ReactElement | ReactNode;
    label?: string;
    icon?: ReactElement;
    isLink?: boolean;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    primary = false,
    type = 'button',
    size = 'medium',
    className,
    backgroundColor,
    onClick,
    label,
    icon,
    isLink = false,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'primary' : 'secondary';
    return (
        <button
            type={type}
            className={['shared-button', size, className, mode, icon && 'has-icon'].join(' ')}
            style={{ backgroundColor }}
            {...props}
            onClick={onClick}
        >
            {!isLink ? label : props.children}
            {icon}
        </button>
    );
};
