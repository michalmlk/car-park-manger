import styled from 'styled-components';

export const CurrentReservationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 540px;
  justify-self: center;
  grid-area: content;

  h3 {
    text-align: left;
    width: 100%;
  }
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
