import { styled } from 'styled-components';

export const StyledPageWrapper = styled.div`
  display: grid;
  box-sizing: border-box;

  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 60px 1fr 60px;
  width: 100%;
  flex-grow: 1;
  align-items: center;

  & > * {
    box-sizing: border-box;
  }
`;
