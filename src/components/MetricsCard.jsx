import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';

const MetricsCard = ({ title, value, icon, trend, description }) => {
  const theme = useTheme();
  
  const trendColor = trend > 0 
    ? theme.palette.success.main 
    : trend < 0 
      ? theme.palette.error.main 
      : theme.palette.text.secondary;
  
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4, boxShadow: theme.shadows[4] }}
      transition={{ type: 'spring', stiffness: 300 }}
      sx={{
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
          {icon && (
            <Box 
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              sx={{ 
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
        
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              mb: 1,
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}
          >
            {value}
          </Typography>
        </Box>
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {description}
          </Typography>
        )}
        
        {trend !== undefined && (
          <Box 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: trendColor,
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500
              }}
            >
              {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
              {Math.abs(trend)}% from last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
