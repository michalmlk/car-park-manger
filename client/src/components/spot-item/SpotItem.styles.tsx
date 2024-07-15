import { styled } from 'styled-components';

export const SpotItemContent = styled.div<{ compact?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.compact ? 'column' : 'row')};
  justify-content: ${(props) => (props.compact ? 'flex-start' : 'space-between')};
  align-items: ${(props) => (props.compact ? 'flex-start' : 'center')};

  & > * {
    margin: 0;
  }
`;
