import styled from 'styled-components';

export type AlignContentOptions =
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'center'
    | 'flex-end';
export type FlexDirectionOptions = 'column' | 'row' | 'row-reverse';

export interface PageContentWrapperProps {
    justifyContent?: AlignContentOptions;
    alignItems?: AlignContentOptions;
    flexDirection?: FlexDirectionOptions;
}

const PageContentWrapper = styled.div<PageContentWrapperProps>`
    display: flex;
    justify-content: ${(props) => props.justifyContent || 'center'};
    flex-direction: ${(props) => props.flexDirection || 'column'};
    align-items: ${(props) => props.alignItems || 'center'};
`;

export default PageContentWrapper;
