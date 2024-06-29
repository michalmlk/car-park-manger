import { styled } from 'styled-components';

export const SpotsWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: var(--topbar-padding);
`;

export const PageWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-areas:
    'title'
    'subtitle'
    'content'
    'footer';
  grid-template-rows: 60px 60px 1fr 80px;
  width: 100%;
  max-width: 768px;
  flex-grow: 1;

  ${SpotsWrapper} {
    grid-area: content;
  }
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageTitle = styled.header`
  display: flex;
  font-size: var(--font-size-h1);
  padding: var(--page-content-padding);
  font-weight: bold;
  grid-area: title;
`;

export const PageSubtitle = styled.header`
  display: flex;
  font-size: var(--font-size-h3);
  padding: var(--page-content-padding);
  grid-area: subtitle;
`;

export const PageFooter = styled.div`
  grid-area: footer;
`;
