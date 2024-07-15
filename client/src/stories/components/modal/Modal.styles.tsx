import { styled } from 'styled-components';

export const ModalBackdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: 5px 10px 12px rgba(0, 0, 0, 0.02);
  z-index: 999;
  top: 50%;
  max-width: 480px;
`;

export const ModalContent = styled.div`
  display: flex;
  width: 100%;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  text-align: left;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;
