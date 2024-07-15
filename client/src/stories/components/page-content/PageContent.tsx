import { FC, PropsWithChildren } from 'react';
import { StyledPageContent } from './PageContent.styles.tsx';

export const PageContent: FC<PropsWithChildren> = ({ children }) => <StyledPageContent>{children}</StyledPageContent>;
