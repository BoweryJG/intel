import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Switch, 
  useTheme, 
  AppBar, 
  Toolbar,
  FormControlLabel
} from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Header = () => {
  const theme = useTheme();
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="h1" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            color: theme.palette.text.primary
          }}
        >
          Intel Dashboard
        </Typography>
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={themeMode === 'aesthetic'}
                onChange={toggleTheme}
                color="primary"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: themeMode === 'aesthetic' ? theme.palette.secondary.main : theme.palette.primary.main,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: themeMode === 'aesthetic' ? theme.palette.secondary.main : theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontWeight: themeMode === 'dental' ? 'bold' : 'normal',
                    color: themeMode === 'dental' ? theme.palette.primary.main : theme.palette.text.secondary
                  }}
                >
                  Dental
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontWeight: themeMode === 'aesthetic' ? 'bold' : 'normal',
                    color: themeMode === 'aesthetic' ? theme.palette.primary.main : theme.palette.text.secondary
                  }}
                >
                  Aesthetic
                </Typography>
              </Box>
            }
            labelPlacement="start"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
