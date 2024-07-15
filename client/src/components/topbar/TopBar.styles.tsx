import { styled } from 'styled-components';

export const TopBarWrapper = styled.header`
  display: flex;
  box-sizing: border-box;
  width: calc(100% - 2 * var(--topbar-margin));
  padding: var(--topbar-padding);
  height: var(--topbar-height);
  justify-content: space-between;
  align-items: center;
  border-radius: var(--components-border-radius);
  border: 1px solid var(--topbar-border--color);
  margin: var(--topbar-margin);
`;
