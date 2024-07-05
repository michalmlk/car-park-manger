import { FC, ReactElement } from 'react';
import { StyledPageFooterWrapper } from './PageFooter.styles.tsx';

export interface PageFooterProps {
  leftArea?: ReactElement;
  rightArea?: ReactElement;
}

export const PageFooter: FC<PageFooterProps> = ({ leftArea, rightArea }) => {
  return (
    <StyledPageFooterWrapper rightArea={rightArea} leftArea={leftArea}>
      {leftArea}
      {rightArea}
    </StyledPageFooterWrapper>
  );
};
