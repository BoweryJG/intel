import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import SupabaseTest from '../components/SupabaseTest';
import SupabaseDataTest from './components/SupabaseDataTest';
import {
  Container, Grid, Card, CardContent, Typography, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

console.log('DashboardPage component is being rendered');

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [industry, setIndustry] = useState('aesthetic'); // Default to aesthetic industry

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting data fetch for industry:', industry);

        // Test query first
        const { data: test, error: testError } = await supabase
          .from('news_articles')
          .select('id, title, industry')
          .limit(1);

        if (testError) {
          console.error('Test query failed:', testError);
          throw testError;
        }
        console.log('Test query succeeded:', test);

        // Fetch articles
        const { data: articles, error: articlesError } = await supabase
          .from('news_articles')
          .select('*')
          .eq('industry', industry);

        if (articlesError) {
          console.error('Articles query failed:', articlesError);
          throw articlesError;
        }
        console.log('Articles fetched:', articles.length);

        // Fetch procedures
        const { data: procedures, error: proceduresError } = await supabase
          .from('news_article_aesthetic_procedures')
          .select('*')
          .limit(5);

        if (proceduresError) {
          console.error('Procedures query failed:', proceduresError);
          throw proceduresError;
        }
        console.log('Procedures fetched:', procedures.length);

        // Fetch categories
        const { data: categories, error: categoriesError } = await supabase
          .from('news_articles_with_aesthetic_categories')
          .select('*')
          .limit(5);

        if (categoriesError) {
          console.error('Categories query failed:', categoriesError);
          throw categoriesError;
        }
        console.log('Categories fetched:', categories.length);

        // Log raw data for debugging
        console.log('Raw articles:', articles);
        console.log('Raw procedures:', procedures);
        console.log('Raw categories:', categories);

        // Transform the data to match our expected structure
        const transformedData = {
          metrics: {
            total_articles: articles?.length || 0,
            average_relevance: procedures?.reduce((sum, p) => sum + (p.relevance_score || 0), 0) / (procedures?.length || 1),
            expected_growth: articles?.[0]?.expected_growth_rate || 0
          },
          procedures: procedures.map(p => ({
            id: p.id,
            article_id: p.article_id,
            procedure_id: p.procedure_id
          })) || [],
          categories: categories.map(c => ({
            id: c.id,
            article_id: c.article_id,
            category_id: c.category_id
          })) || []
        };

        console.log('Transformed data:', transformedData);
        setDashboardData(transformedData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [industry]);

  console.log('Rendering DashboardPage with state:', { loading, error, dashboardData });

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <SupabaseTest />
      {loading ? (
        <>
          <Typography>Loading data...</Typography>
          <CircularProgress />
        </>
      ) : error ? (
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      ) : dashboardData ? (
        <Grid container spacing={3}>
          {/* Display metrics */}
          {dashboardData.metrics && Object.entries(dashboardData.metrics).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{key.replace(/_/g, ' ')}</Typography>
                  <Typography variant="h5">{String(value)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Display procedures */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top Procedures</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Procedure Name</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.procedures.map((procedure, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{procedure.name}</TableCell>
                        <TableCell>{procedure.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Display categories */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top Categories</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Category Name</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.categories.map((category, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">No data available</Typography>
      )}
      
      {/* Add the test component at the bottom */}
      <SupabaseDataTest />
    </Container>
  );
}
