import React, { useContext } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from 'recharts';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const TrendChart = ({ data, title, dataKey = 'value', secondaryDataKey }) => {
  const theme = useTheme();
  const { themeMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const primaryColor = themeMode === 'dental' 
    ? theme.palette.primary.main 
    : theme.palette.primary.main;
    
  const secondaryColor = themeMode === 'dental'
    ? theme.palette.secondary.main
    : theme.palette.secondary.main;
  
  if (!data || data.length === 0) {
    return (
      <Card sx={{ width: '100%', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        width: '100%', 
        mb: 2,
        overflow: 'hidden'
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        
        <Box 
          sx={{ 
            height: 250, 
            width: '100%',
            mt: 2
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ 
                top: 5, 
                right: 20, 
                bottom: 5, 
                left: isMobile ? 0 : 10 
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme.palette.divider} 
                vertical={!isMobile}
              />
              <XAxis 
                dataKey="name" 
                stroke={theme.palette.text.secondary}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: theme.palette.divider }}
                axisLine={{ stroke: theme.palette.divider }}
                height={40}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={10}
              />
              <YAxis 
                stroke={theme.palette.text.secondary}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: theme.palette.divider }}
                axisLine={{ stroke: theme.palette.divider }}
                width={40}
                tickMargin={8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[3],
                }}
                itemStyle={{
                  color: theme.palette.text.primary,
                }}
                labelStyle={{
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: 10,
                  fontSize: 12,
                  color: theme.palette.text.secondary
                }}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}
                stroke={primaryColor}
                strokeWidth={2}
                dot={{ r: 3, fill: primaryColor, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                animationDuration={1500}
              />
              {secondaryDataKey && (
                <Line 
                  type="monotone" 
                  dataKey={secondaryDataKey} 
                  name={secondaryDataKey.charAt(0).toUpperCase() + secondaryDataKey.slice(1)}
                  stroke={secondaryColor}
                  strokeWidth={2}
                  dot={{ r: 3, fill: secondaryColor, strokeWidth: 1 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
