import { styled } from 'styled-components';

export const DashboardWrapper = styled.div`
  display: grid;
  box-sizing: border-box;

  grid-template-areas:
    'header'
    'reservations'
    'bottombar';
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
`;
