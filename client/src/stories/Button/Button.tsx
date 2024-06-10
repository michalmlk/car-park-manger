import React, { PropsWithChildren, ReactElement } from 'react';
import './button.scss';
import { Icon, IconTypeMap } from '@mui/material';

type ButtonType = 'button' | 'submit';

interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    type?: ButtonType;
    className?: string;
    children?: ReactElement;
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
    isLink,
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
