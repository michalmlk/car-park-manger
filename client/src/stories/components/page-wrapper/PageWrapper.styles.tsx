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
  padding: 2rem 4rem 0;
  align-items: center;

  @media (max-width: 540px) {
    padding: 1rem;
  }
`;
