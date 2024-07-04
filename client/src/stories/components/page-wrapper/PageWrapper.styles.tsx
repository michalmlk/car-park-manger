import { styled } from 'styled-components';

export const StyledPageWrapper = styled.div`
  display: grid;
  box-sizing: border-box;

  grid-template-areas:
    'header'
    'content'
    'bottombar';
  grid-template-rows: 60px 1fr 100px;
  width: 100%;
  flex-grow: 1;
  padding: 2rem 4rem;

  @media (max-width: 540px) {
    padding: 1rem;
  }
`;
