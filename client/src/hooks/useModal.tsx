import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.getElementById('modal-root')!.style.display = 'flex';
    } else {
      document.getElementById('modal-root')!.style.display = 'none';
    }
  }, [isOpen]);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return {
    isOpen,
    toggleModal,
  };
};
