import { StyledPageHeader } from './PageHeader.styles.tsx';
import { IconButton } from '@mui/material';
import { Action } from '../../../model/ActionModel.ts';

export interface PageHeaderProps {
  title: string;
  actions?: Action[];
  showActions?: boolean;
}

export function PageHeader({ title, actions, showActions = true }: PageHeaderProps) {
  return (
    <StyledPageHeader>
      {actions && showActions && (
        <div>
          {actions.map(({ action, icon }, idx) => (
            <IconButton key={idx} onClick={action}>
              {icon}
            </IconButton>
          ))}
        </div>
      )}
      <h2>{title}</h2>
    </StyledPageHeader>
  );
}
