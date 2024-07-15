import { styled } from 'styled-components';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

export const StyledDateTimePicker = styled(DateTimePicker)`
  flex-grow: 1;
`;

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

export const DateSelectorWrapper = styled.div<{ isVisible?: boolean }>`
  display: flex;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: 2rem;
  transition: all 0.2s ease;

  h2 {
    margin: 2rem 0;
  }
`;
