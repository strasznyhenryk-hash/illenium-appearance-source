import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';

const defaultTheme: any = {
  id: 'default',
  borderRadius: '6px',
  fontColor: '255, 255, 255',
  fontColorHover: '255, 255, 255',
  fontColorSelected: '255, 255, 255',
  fontFamily: 'Inter',
  primaryBackground: '18, 18, 20',
  primaryBackgroundSelected: '227, 32, 59',
  secondaryBackground: '0, 0, 0',
  accentColor: '227, 32, 59',
  scaleOnHover: false,
  sectionFontWeight: '600',
  smoothBackgroundTransition: true,
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const getCurrentTheme = (themeData: any) => {
    for (let index = 0; index < themeData.themes.length; index++) {
      if (themeData.themes[index].id === themeData.currentTheme) {
        return { ...defaultTheme, ...themeData.themes[index] };
      }
    }
    return defaultTheme;
  };

  const loadTheme = useCallback(async () => {
    const themeData = await Nui.post('get_theme_configuration');
    const theme = getCurrentTheme(themeData);
    if (theme) {
      setCurrentTheme(theme);
    }
  }, []);

  useEffect(() => {
    loadTheme().catch(console.error);
  }, [loadTheme]);

  return (
    <NuiStateProvider>
      <ThemeProvider theme={currentTheme}>
        <Appearance />
        <GlobalStyles />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
