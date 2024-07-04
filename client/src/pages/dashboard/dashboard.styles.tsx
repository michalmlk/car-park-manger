import { styled } from 'styled-components';

export const DashboardWrapper = styled.div`
  display: grid;
  box-sizing: border-box;

  grid-template-areas:
    'header'
    'reservation'
    'bottombar';
  grid-template-rows: 60px 1fr 100px;
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
`;
