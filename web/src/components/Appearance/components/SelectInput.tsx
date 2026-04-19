import { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;

  > .label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
`;

const customStyles: any = {
  control: (styles: any) => ({
    ...styles,
    background: 'rgba(30, 30, 32, 0.8)',
    fontSize: '13px',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '6px',
    minHeight: '40px',
    '&:hover': {
      borderColor: 'rgba(227, 32, 59, 0.5)',
    },
  }),
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  input: (styles: any) => ({
    ...styles,
    fontSize: '13px',
    color: '#fff',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '13px',
    color: '#fff',
    fontWeight: 500,
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    color: '#fff',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    color: '#fff',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: 'rgba(255, 255, 255, 0.5)',
    '&:hover': { color: '#fff' },
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    background: 'rgba(255, 255, 255, 0.08)',
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    color: '#fff',
    zIndex: 9999,
  }),
  menu: (styles: any) => ({
    ...styles,
    background: 'rgba(18, 18, 20, 0.98)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '6px',
    overflow: 'hidden',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: 'transparent',
    padding: '4px',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '3px',
      background: 'rgba(227, 32, 59, 0.4)',
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    borderRadius: '4px',
    fontSize: '13px',
    padding: '8px 10px',
    color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.8)',
    background: isSelected
      ? 'rgba(227, 32, 59, 0.8)'
      : isFocused
      ? 'rgba(255, 255, 255, 0.06)'
      : 'transparent',
    cursor: 'pointer',
  }),
};

const SelectInput = ({ title, items, defaultValue, onChange }: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName(
        'Select' + title + '__option--is-selected',
      )[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  useContext(ThemeContext);

  return (
    <Container>
      <span className="label">{title}</span>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={'Select' + title}
        classNamePrefix={'Select' + title}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;
