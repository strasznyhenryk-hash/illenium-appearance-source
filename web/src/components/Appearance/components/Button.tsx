import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  onClick: () => void;
}

const CustomButton = styled.span<ButtonProps>`
  padding: 10px 14px;
  margin: ${props => props?.margin || '0px'};
  width: ${props => props?.width || 'auto'};
  color: #fff;
  background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.9);
  text-align: center;
  border-radius: ${props => props.theme.borderRadius || '6px'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);

  &:hover {
    background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.25);
  }
`;

const Button = ({ children, onClick, margin, width }: ButtonProps) => {
  return (
    <CustomButton onClick={onClick} margin={margin} width={width}>
      {children}
    </CustomButton>
  );
};

export default Button;
