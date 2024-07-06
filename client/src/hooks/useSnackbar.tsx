import { ReactElement, useMemo, useState } from 'react';
import { Snackbar } from '@mui/material';

export const useSnackbar = ({
  successMessage,
  errorMessage,
  isError,
}: {
  successMessage: string;
  errorMessage: string;
  isError: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeout = 2000;

  const handleSnackbarInvoke = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, timeout);
  };

  const handleSnackbarClose = (): void => setIsOpen(false);

  const renderSnackbar = useMemo((): ReactElement => {
    return (
      <Snackbar
        open={isOpen}
        onClose={handleSnackbarClose}
        message={isError ? errorMessage : successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      ></Snackbar>
    );
  }, [errorMessage, successMessage, isError, isOpen]);

  return {
    handleSnackbarInvoke,
    renderSnackbar,
    handleSnackbarClose,
  };
};
