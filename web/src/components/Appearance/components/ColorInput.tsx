import { useCallback } from 'react';
import styled, { css } from 'styled-components';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > .label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  > .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;

const Button = styled.button<ButtonProps>`
  height: 22px;
  width: 22px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.15s ease;

  &:hover {
    border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.8);
    transform: scale(1.1);
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid rgba(${props => props.theme.accentColor || '227, 32, 59'}, 1);
      box-shadow: 0 0 0 1px rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.3);
    `}
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue, onChange }) => {
  const selectColor = useCallback(
    (color: number) => {
      onChange(color);
    },
    [onChange],
  );

  return (
    <Container>
      <span className="label">{title}</span>
      <div className="swatches">
        {colors.map((color, index) => (
          <Button
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ColorInput;
