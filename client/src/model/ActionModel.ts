import { ReactNode } from 'react';

export interface Action {
  icon: ReactNode;
  // eslint-disable-next-line no-unused-vars
  action: (arg?: any) => void;
  disabled?: boolean;
  tooltipText?: string;
}
