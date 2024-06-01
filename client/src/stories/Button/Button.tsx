import React, { PropsWithChildren } from 'react';
import './button.scss';

interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children?: React.ReactNode;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    primary = false,
    size = 'medium',
    backgroundColor,
    onClick,
    children,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'primary' : 'secondary';
    return (
        <button
            type="button"
            className={['shared-button', size, mode].join(' ')}
            style={{ backgroundColor }}
            {...props}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
