import { styled } from 'styled-components';

export const NearestReservationsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  max-width: 640px;
  overflow: hidden;

  h3 {
    text-align: left;
  }
`;

export const NearestReservationsScrollContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 1rem;
  overflow-x: scroll;
  padding: 0.5rem 0;
  box-shadow: inset 0 0 41px 7px rgba(255, 255, 255, 1);
  > * {
    max-width: 200px;
    z-index: -1;
  }
`;
