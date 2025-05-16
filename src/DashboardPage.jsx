import React, { useState, useEffect } from 'react';
import { fetchDashboardData } from './services/supabaseClient';
import {
  Container, Grid, Card, CardContent, Typography, CircularProgress, 
  Table, TableHead, TableRow, TableCell, TableBody, ToggleButton, 
  ToggleButtonGroup, Box, Chip
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [industry, setIndustry] = useState('aesthetic');

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching dashboard data for ${industry} industry...`);
        
        const data = await fetchDashboardData(industry);
        console.log('Dashboard data loaded:', data);
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [industry]);

  const handleIndustryChange = (event, newIndustry) => {
    if (newIndustry !== null) {
      setIndustry(newIndustry);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading dashboard data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!dashboardData) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography>No data available</Typography>
      </Container>
    );
  }

  const { metrics, procedures, categories, providers, trendData } = dashboardData;
  const industryName = industry === 'aesthetic' ? 'Aesthetic' : 'Dental';

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {industryName} Dashboard
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={industry}
          exclusive
          onChange={handleIndustryChange}
          aria-label="industry"
        >
          <ToggleButton value="aesthetic" aria-label="aesthetic">Aesthetic</ToggleButton>
          <ToggleButton value="dental" aria-label="dental">Dental</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { key: 'total_articles', label: 'Total Articles', value: metrics?.total_articles || 0 },
          { key: 'total_procedures', label: 'Procedures Tracked', value: metrics?.total_procedures || 0 },
          { key: 'total_categories', label: 'Categories', value: metrics?.total_categories || 0 },
          { key: 'total_providers', label: 'Providers', value: metrics?.total_providers || 0 },
          { key: 'article_growth_rate', label: 'Article Growth', value: metrics?.article_growth_rate ? `${metrics.article_growth_rate.toFixed(1)}%` : 'N/A' },
          { key: 'procedure_growth_rate', label: 'Procedure Growth', value: metrics?.procedure_growth_rate ? `${metrics.procedure_growth_rate.toFixed(1)}%` : 'N/A' },
        ].map((metric) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={metric.key}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  {metric.label}
                </Typography>
                <Typography variant="h5" component="div">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Top Procedures */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Procedures</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Procedure</TableCell>
                    <TableCell align="right">Mentions</TableCell>
                    <TableCell align="right">Growth</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {procedures?.length > 0 ? (
                    procedures.slice(0, 5).map((procedure) => (
                      <TableRow key={procedure.id}>
                        <TableCell>{procedure.name}</TableCell>
                        <TableCell align="right">{procedure.article_mentions}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={`${procedure.avg_expected_growth?.toFixed(1) || 0}%`} 
                            size="small" 
                            color={procedure.avg_expected_growth >= 0 ? 'success' : 'error'} 
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No procedure data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Trends */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Market Trends</Typography>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Impact Score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Categories */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Categories</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Article Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.length > 0 ? (
                    categories.slice(0, 5).map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell align="right">{category.article_count}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">No category data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Providers */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Providers</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Provider</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Mentions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {providers?.length > 0 ? (
                    providers.slice(0, 5).map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell>{provider.name}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={provider.average_rating?.toFixed(1) || 'N/A'} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">{provider.article_mentions}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No provider data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
