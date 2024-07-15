import { styled } from 'styled-components';
import { ReactElement } from 'react';

interface PageFooterWrapperProps {
  leftArea?: ReactElement;
  rightArea?: ReactElement;
}

export const StyledPageFooterWrapper = styled.div<PageFooterWrapperProps>`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: ${(props) =>
    props.rightArea && props.leftArea ? 'space-between' : props.leftArea ? 'flex-start' : 'flex-end'};
  align-items: center;
  box-sizing: border-box;
  padding: var(--page-footer-padding);
`;
