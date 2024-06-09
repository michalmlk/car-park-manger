import { PropsWithChildren, ReactElement } from 'react';
import PageContentWrapper, { PageContentWrapperProps } from './PageContent.styles.tsx';

export function PageContent({
    justifyContent,
    alignItems,
    flexDirection,
    children,
}: PropsWithChildren<PageContentWrapperProps>): ReactElement {
    return (
        <PageContentWrapper
            justifyContent={justifyContent}
            flexDirection={flexDirection}
            alignItems={alignItems}
        >
            {children}
        </PageContentWrapper>
    );
}
