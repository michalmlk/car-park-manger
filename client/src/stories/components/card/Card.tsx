import { PropsWithChildren } from 'react';
import { StyledCard } from './Card.styles.tsx';

export interface CardProps {
  color?: string;
  activeBorderColor?: string;
  onClick?: () => void;
  canBeSelected?: boolean;
  selected?: boolean;
}

export function Card({
  children,
  color = '#ffffff',
  activeBorderColor = '#104dc0',
  onClick,
  canBeSelected = false,
  selected = false,
}: PropsWithChildren<CardProps>) {
  return (
    <StyledCard
      color={color}
      onClick={onClick}
      canBeSelected={canBeSelected}
      selected={selected}
      activeBorderColor={activeBorderColor}
    >
      {children}
    </StyledCard>
  );
}
