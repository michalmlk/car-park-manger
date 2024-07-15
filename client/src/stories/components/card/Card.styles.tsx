import { styled } from 'styled-components';
import { CardProps } from './Card.tsx';

export const StyledCard = styled.div<CardProps>`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  border: ${({ canBeSelected, selected, activeBorderColor }) =>
    canBeSelected && selected ? `1px solid ${activeBorderColor}` : `1px solid #dddddd`};
  box-shadow: 5px 10px 12px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease;
  cursor: ${({ canBeSelected }) => (canBeSelected ? 'pointer' : 'auto')};
`;
