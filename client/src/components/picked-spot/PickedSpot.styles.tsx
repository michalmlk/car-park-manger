import { styled } from 'styled-components';

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
  grid-template-areas:
    'date actions'
    'place actions';
`;

export const DateWrapper = styled.h3`
  grid-area: date;
  text-align: left;
  margin: 0;
`;

export const PlaceWrapper = styled.div`
  grid-area: place;
  display: flex;
  text-align: left;

  span:nth-of-type(1) {
    font-size: 16px;
    color: #1ea7fd;
  }

  span:nth-of-type(2) {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  grid-area: actions;
`;
