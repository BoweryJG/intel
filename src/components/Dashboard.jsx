import React, { useContext } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';
import { ThemeContext } from '../contexts/ThemeContext';
import MetricsCard from './MetricsCard';
import TrendChart from './TrendChart';
import TopProcedures from './TopProcedures';
import TopCategories from './TopCategories';
import NewsArticles from './NewsArticles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';

const Dashboard = () => {
  const theme = useTheme();
  const { data, newsArticles, loading, error } = useContext(DataContext);
  const { themeMode } = useContext(ThemeContext);
  
  const industryTitle = themeMode === 'dental' ? 'Dental' : 'Aesthetic';
  
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }
  
  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          No data available. Please try again later.
        </Alert>
      </Container>
    );
  }
  
  const { metrics, procedures, categories, trendData } = data;
  const { byProcedures, byCategories } = newsArticles || { byProcedures: [], byCategories: [] };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            color: theme.palette.text.primary
          }}
        >
          {industryTitle} Industry Intelligence
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Market insights and trends based on news analysis
        </Typography>
      </Box>
      
      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard 
            title="Total Articles" 
            value={metrics?.total_articles || 0}
            icon={<ArticleIcon />}
            trend={metrics?.article_growth_rate || 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard 
            title="Procedures Tracked" 
            value={metrics?.total_procedures || 0}
            icon={<TrendingUpIcon />}
            trend={metrics?.procedure_growth_rate || 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard 
            title="Categories" 
            value={metrics?.total_categories || 0}
            icon={<CategoryIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricsCard 
            title="Providers" 
            value={metrics?.total_providers || 0}
            icon={<PeopleIcon />}
            trend={metrics?.provider_growth_rate || 0}
          />
        </Grid>
      </Grid>
      
      {/* Trend Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TrendChart 
            data={trendData} 
            title="Market Trends" 
            dataKey="value" 
            secondaryDataKey="impact"
          />
        </Grid>
      </Grid>
      
      {/* Procedures and Categories */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TopProcedures 
            procedures={procedures} 
            title={`Top ${industryTitle} Procedures`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopCategories 
            categories={categories} 
            title={`Top ${industryTitle} Categories`}
          />
        </Grid>
      </Grid>
      
      {/* News Articles */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NewsArticles 
            procedureArticles={byProcedures}
            categoryArticles={byCategories}
            title={`${industryTitle} Industry News`}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
