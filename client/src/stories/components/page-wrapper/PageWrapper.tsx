import { FC, PropsWithChildren } from 'react';
import { StyledPageWrapper } from './PageWrapper.styles.tsx';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => <StyledPageWrapper>{children}</StyledPageWrapper>;
