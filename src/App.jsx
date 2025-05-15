import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <CssBaseline />
        <div className="App">
          <Header />
          <main>
            <Dashboard />
          </main>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
