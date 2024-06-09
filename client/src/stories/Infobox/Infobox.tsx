import React from 'react';
import {
    StyledInfoBoxAction,
    StyledInfoBoxDescription,
    StyledInfoBoxHeader,
    StyledInfoBoxWrapper,
} from './Infobox.styles.tsx';
import { AlignContentOptions } from '../PageContent/PageContent.styles.tsx';
import { Button } from '../Button/Button.tsx';

export interface InfoboxProps {
    title: string;
    description?: string;
    actionButtonLabel?: string;
    onAction?: () => void;
    headerColor?: 'primary' | 'secondary' | 'text';
    descriptionColor?: 'primary' | 'secondary' | 'text';
    alignItems?: AlignContentOptions;
    justifyContent?: AlignContentOptions;
}

export const Infobox: React.FC<InfoboxProps> = ({
    title,
    headerColor = 'primary',
    descriptionColor = 'text',
    alignItems = 'center',
    justifyContent = 'center',
    description,
    actionButtonLabel,
    onAction,
}) => {
    return (
        <StyledInfoBoxWrapper alignItems={alignItems} justifyContent={justifyContent}>
            <StyledInfoBoxHeader color={headerColor}>{title}</StyledInfoBoxHeader>
            {description && (
                <StyledInfoBoxDescription color={descriptionColor}>
                    {description}
                </StyledInfoBoxDescription>
            )}
            {actionButtonLabel && (
                <StyledInfoBoxAction>
                    <Button primary onClick={onAction}>
                        {actionButtonLabel}
                    </Button>
                </StyledInfoBoxAction>
            )}
        </StyledInfoBoxWrapper>
    );
};
