import styled from 'styled-components';
import { AlignContentOptions } from '../PageContent/PageContent.styles.tsx';

interface InfoboxWrapperProps {
    justifyContent?: AlignContentOptions;
    alignItems?: AlignContentOptions;
}

export const StyledInfoBoxWrapper = styled.div<InfoboxWrapperProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.justifyContent || 'center'};
    align-items: ${(props) => props.alignItems || 'center'};
    gap: var(--spacing-l);
`;

export const StyledInfoBoxHeader = styled.h1<{ color: 'primary' | 'secondary' | 'text' }>`
    font-size: var(--font-size-l);
    color: ${(props) =>
        props.color === 'primary'
            ? `var(--color-primary)`
            : props.color === 'secondary'
              ? `var(--color-accent)`
              : 'var(--color-text)'};
`;

export const StyledInfoBoxDescription = styled.p<{ color: 'primary' | 'secondary' | 'text' }>`
    font-size: var(--font-size-m);
    color: ${(props) => props.color};
    text-align: center;
`;

export const StyledInfoBoxAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
