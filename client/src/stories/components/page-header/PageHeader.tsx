import { StyledPageHeader, StyledTitleWrapper } from './PageHeader.styles.tsx';
import { IconButton, Tooltip } from '@mui/material';
import { Action } from '../../../model/ActionModel.ts';
import { ArrowBack } from '@mui/icons-material';

export interface PageHeaderProps {
  title: string;
  actions?: Action[];
  showActions?: boolean;
  onBack?: () => void;
  showBackIcon?: boolean;
}

export function PageHeader({ title, actions, showActions = true, onBack, showBackIcon = false }: PageHeaderProps) {
  return (
    <StyledPageHeader>
      <StyledTitleWrapper>
        {showBackIcon && (
          <IconButton onClick={onBack}>
            <ArrowBack />
          </IconButton>
        )}
        <h2>{title}</h2>
      </StyledTitleWrapper>
      {actions && showActions && (
        <div>
          {actions.map(({ action, icon, disabled, tooltipText }, idx) => (
            <Tooltip key={idx} title={tooltipText}>
              <IconButton onClick={action} disabled={disabled}>
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </div>
      )}
    </StyledPageHeader>
  );
}
