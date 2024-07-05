import styled from 'styled-components';

export const CurrentReservationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 540px;
  justify-self: center;
  grid-area: content;
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  * {
    margin: 0;
  }

  p {
    font-size: 1.25rem;
  }
`;
