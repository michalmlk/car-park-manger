import { FC } from 'react';
import { format } from 'date-fns/format';
import { styled } from 'styled-components';

interface DetailsRowProps {
  label: string;
  value: string | number;
  isDate?: boolean;
}

const StyledDetailsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, 10px) 1fr;
  justify-items: start;
  grid-gap: 1rem;

  * {
    margin: 0;
  }

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    font-weight: lighter;
  }
`;

export const DetailsRow: FC<DetailsRowProps> = ({ label, value, isDate }) => {
  return (
    <StyledDetailsRow>
      <p>{label}</p>
      <p>{isDate ? format(new Date(value), 'dd/MM/yyyy hh:MM') : value}</p>
    </StyledDetailsRow>
  );
};
