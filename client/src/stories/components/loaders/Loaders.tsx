import { FC } from 'react';
import styled from 'styled-components';

export interface LoaderProps {
  duration?: number;
  color?: string;
  label?: string;
}

export const StyledLoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledSpinnerElement = styled.div<LoaderProps>`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 159, 0.3);
  border-radius: 50%;
  border-top-color: ${({ color }) => color};

  animation: spin 2s linear infinite;
  animation-duration: ${({ duration }) => `${duration}s` || '2s'};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner: FC<LoaderProps> = ({ duration = 0.75, color = 'blue', label = '' }) => {
  return (
    <StyledLoaderWrapper>
      <StyledSpinnerElement duration={duration} color={color} />
      <h3>{label}</h3>
    </StyledLoaderWrapper>
  );
};
