import { styled } from 'styled-components';

export const SpotsWrapper = styled.div<{ isVisible: boolean }>`
  display: flex;
  visibility: ${({ isVisible }) => (isVisible ? ' visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  box-sizing: border-box;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: var(--topbar-padding);
  align-self: center;
  transition: all 0.2s ease;
`;
