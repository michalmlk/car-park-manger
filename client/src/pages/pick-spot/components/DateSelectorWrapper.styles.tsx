import { styled } from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers';

export const StyledDatePicker = styled(DatePicker)`
  flex-grow: 1;
`;
export const DateInputsArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const DateSelectorWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 2rem;

  h2 {
    margin: 1rem 0;
  }
`;
