import { IconButton } from '@mui/material';
import styles from './PageHeader.module.scss';
import React, { ReactElement } from 'react';
import { ArrowBack } from '@mui/icons-material';

export interface Action {
    type: string;
    onClick: () => void;
    icon: React.ReactElement;
}

export interface PageHeaderProps {
    title: string;
    onBack?: () => void;
    actions?: Action[];
    customContent?: ReactElement;
}

export function PageHeader({ title, onBack, actions, customContent }: PageHeaderProps) {
    return (
        <div className={styles['page-header-wrapper']}>
            <div className={styles['title-container']}>
                {onBack && (
                    <IconButton onClick={onBack}>
                        <ArrowBack />
                    </IconButton>
                )}
                <h1>{title}</h1>
            </div>
            <div className={styles['actions']}>
                {actions &&
                    actions.map((action, index) => (
                        <IconButton key={index} onClick={action.onClick}>
                            {action.icon}
                        </IconButton>
                    ))}
            </div>
            <div className={styles['custom-content']}>{customContent}</div>
        </div>
    );
}
