import { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  height: 40px;
  padding: 0 12px;

  background: rgba(30, 30, 32, 0.6);
  border-radius: ${props => props.theme.borderRadius || '6px'};
  border: 1px solid rgba(255, 255, 255, 0.05);

  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.4);
  }

  > .label {
    flex-shrink: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }

  > .slider {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 2px;
    outline: none;
    padding: 0;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.12);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background: rgb(${props => props.theme.accentColor || '227, 32, 59'});
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 0 3px rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.25);
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 1,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const parsed = parseFloat(e.target.value);
      onChange(parsed);
    },
    [onChange],
  );

  return (
    <Container>
      <span className="label">{title}</span>
      <div className="slider">
        <input
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          onChange={handleChange}
        />
      </div>
    </Container>
  );
};

export default RangeInput;
