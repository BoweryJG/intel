import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { dentalTheme } from '../theme/dentalTheme';
import { aestheticTheme } from '../theme/aestheticTheme';

export const ThemeContext = createContext({
  themeMode: 'dental',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dental');
  
  const theme = useMemo(() => {
    return themeMode === 'dental' ? dentalTheme : aestheticTheme;
  }, [themeMode]);
  
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dental' ? 'aesthetic' : 'dental');
  };
  
  const contextValue = useMemo(() => {
    return { themeMode, toggleTheme };
  }, [themeMode]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
