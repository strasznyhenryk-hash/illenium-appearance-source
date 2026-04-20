import styled, { css } from 'styled-components';
import { FaMars, FaVenus } from 'react-icons/fa';

interface GenderProps {
  isMale: boolean;
  onChange: (male: boolean) => void;
  disabled?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: ${props => props.theme.borderRadius || '6px'};
  background: rgba(18, 18, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.4px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

interface ToggleProps {
  active: boolean;
  disabled?: boolean;
}

const Toggle = styled.button<ToggleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${props => props.theme.borderRadius || '6px'};
  background: rgba(30, 30, 32, 0.75);
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  cursor: pointer;

  svg {
    opacity: 0.7;
  }

  &:hover {
    color: #fff;
    border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.4);
    svg {
      opacity: 1;
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
      background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.18);
      border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.9);
      box-shadow: inset 0 0 0 1px rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.4);

      svg {
        color: rgb(${props => props.theme.accentColor || '227, 32, 59'});
        opacity: 1;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`;

const Gender: React.FC<GenderProps> = ({ isMale, onChange, disabled }) => {
  return (
    <Container>
      <Title>Choose the Gender</Title>
      <Buttons>
        <Toggle
          type="button"
          active={isMale}
          disabled={disabled}
          onClick={() => !disabled && onChange(true)}
        >
          <FaMars size={14} /> Male
        </Toggle>
        <Toggle
          type="button"
          active={!isMale}
          disabled={disabled}
          onClick={() => !disabled && onChange(false)}
        >
          <FaVenus size={14} /> Female
        </Toggle>
      </Buttons>
    </Container>
  );
};

export default Gender;
