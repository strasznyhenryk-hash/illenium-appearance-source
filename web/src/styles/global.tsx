import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle<{theme: any}>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  }

  body {
    background: transparent;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  button {
    cursor: pointer;
    outline: 0;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.4);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(${props => props.theme.accentColor || '227, 32, 59'}, 0.8);
  }
`;
