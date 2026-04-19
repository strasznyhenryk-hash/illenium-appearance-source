import { ReactElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  FaVideo,
  FaStreetView,
  FaUndo,
  FaRedo,
  FaSave,
  FaTimes,
  FaTshirt,
} from 'react-icons/fa';

import { CameraState, ClothesState, RotateState } from './interfaces';

interface ToggleButtonProps {
  active: boolean;
}

interface ToggleOptionProps {
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
  title?: string;
}

interface OptionsProps {
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
  enableExit: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const IconButton = styled.button<ToggleButtonProps>`
  height: 36px;
  width: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: ${props => props.theme.borderRadius || '6px'};

  transition: all 0.2s ease;

  color: rgba(255, 255, 255, 0.8);
  background: rgba(18, 18, 20, 0.75);
  backdrop-filter: blur(6px);

  &:hover {
    color: #fff;
    background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.15);
    border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.5);
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
      background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.9);
      border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);

      &:hover {
        background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);
      }
    `}
`;

const Divider = styled.div`
  height: 1px;
  margin: 2px 6px;
  background: rgba(255, 255, 255, 0.08);
`;

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick, title }) => {
  return (
    <IconButton type="button" active={active} onClick={onClick} title={title}>
      {children}
    </IconButton>
  );
};

interface OptionProps {
  onClick: () => void;
  title?: string;
  children?: ReactNode;
}

const Option: React.FC<OptionProps> = ({ children, onClick, title }) => {
  return (
    <IconButton type="button" active={false} onClick={onClick} title={title}>
      {children}
    </IconButton>
  );
};

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleExit,
  handleSave,
  enableExit,
}) => {
  const anyCameraActive = camera.head || camera.body || camera.bottom;

  return (
    <Container>
      <ToggleOption
        active={anyCameraActive}
        onClick={() => {
          if (anyCameraActive) {
            handleSetCamera('head');
          } else {
            handleSetCamera('body');
          }
        }}
        title="Camera"
      >
        <FaVideo size={14} />
      </ToggleOption>
      <Option onClick={handleTurnAround} title="Turn around">
        <FaStreetView size={14} />
      </Option>
      <Option onClick={() => handleSetCamera('body')} title="Body camera">
        <FaTshirt size={14} />
      </Option>
      <ToggleOption active={rotate.left} onClick={handleRotateLeft} title="Rotate left">
        <FaRedo size={13} />
      </ToggleOption>
      <ToggleOption active={rotate.right} onClick={handleRotateRight} title="Rotate right">
        <FaUndo size={13} />
      </ToggleOption>
      <Divider />
      <Option onClick={handleSave} title="Save">
        <FaSave size={14} />
      </Option>
      {enableExit && (
        <Option onClick={handleExit} title="Exit">
          <FaTimes size={14} />
        </Option>
      )}
    </Container>
  );
};

export default Options;
