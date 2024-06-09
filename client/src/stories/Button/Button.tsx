import React, { PropsWithChildren } from 'react';
import './button.scss';

type ButtonType = 'button' | 'submit';

interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children?: React.ReactNode;
    type?: ButtonType;
    className?: string;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    primary = false,
    type = 'button',
    size = 'medium',
    className,
    backgroundColor,
    onClick,
    children,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'primary' : 'secondary';
    return (
        <button
            type={type}
            className={['shared-button', size, className, mode].join(' ')}
            style={{ backgroundColor }}
            {...props}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
