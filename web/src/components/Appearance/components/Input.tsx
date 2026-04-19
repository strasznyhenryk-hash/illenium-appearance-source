import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  height: 40px;
  padding: 0 4px 0 10px;

  background: rgba(30, 30, 32, 0.6);
  border-radius: ${props => props.theme.borderRadius || '6px'};
  border: 1px solid rgba(255, 255, 255, 0.05);

  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.4);
  }

  > .label {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .controls {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;

    button {
      height: 32px;
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.75);
      border: 0;
      background: transparent;
      border-radius: 4px;
      transition: all 0.15s ease;

      &:hover {
        color: rgb(${props => props.theme.accentColor || '227, 32, 59'});
        background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.1);
      }
    }

    input {
      height: 32px;
      min-width: 40px;
      max-width: 50px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      border: 0;
      background: transparent;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({
  title,
  min = 0,
  max = 255,
  blacklisted = [],
  defaultValue,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlacklisted = (value: number, list: number[]) => list.indexOf(value) !== -1;

  const normalize = (value: number) => {
    if (value < min) return max;
    if (value > max) return min;
    return value;
  };

  const checkBlacklisted = (value: number, list: number[], factor: number) => {
    if (factor === 0) {
      if (!isBlacklisted(value, list)) return normalize(value);
      factor = value > defaultValue ? 1 : -1;
    }

    let next = value;
    do {
      next = normalize(next + factor);
    } while (isBlacklisted(next, list));
    return next;
  };

  const getSafeValue = useCallback(
    (value: number, factor: number) => checkBlacklisted(value, blacklisted, factor),
    [min, max, blacklisted, defaultValue],
  );

  const handleChange = useCallback(
    (value: any, factor: number) => {
      if (value === null || value === undefined || value === '') return;
      if (Number.isNaN(value)) return;

      const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
      if (Number.isNaN(parsed)) return;

      onChange(getSafeValue(parsed, factor));
    },
    [getSafeValue, onChange],
  );

  return (
    <Container>
      <span className="label">{title}</span>
      <div className="controls">
        <button type="button" onClick={() => handleChange(defaultValue, -1)}>
          <FiChevronLeft strokeWidth={3} size={16} />
        </button>
        <input
          type="number"
          ref={inputRef}
          value={defaultValue}
          onChange={e => handleChange(e.target.value, 0)}
        />
        <button type="button" onClick={() => handleChange(defaultValue, 1)}>
          <FiChevronRight strokeWidth={3} size={16} />
        </button>
      </div>
    </Container>
  );
};

export default Input;
