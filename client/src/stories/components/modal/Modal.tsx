import { FC, PropsWithChildren } from 'react';
import { ModalBackdrop, ModalContent, ModalFooter, ModalTitle, ModalWrapper } from './Modal.styles.tsx';
import { Button } from '../button/Button.tsx';

export interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  onConfirmLabel: string;
  onCancelLabel: string;
  title: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  onClose,
  onCancelLabel,
  children,
  title,
  onConfirmLabel,
  onConfirm,
}) => {
  return (
    <ModalBackdrop>
      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <Button label={onCancelLabel} onClick={onClose} />
          <Button primary label={onConfirmLabel} onClick={onConfirm} />
        </ModalFooter>
      </ModalWrapper>
    </ModalBackdrop>
  );
};
