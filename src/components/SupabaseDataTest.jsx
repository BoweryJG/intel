import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { supabase } from '../services/supabaseClient';

const SupabaseDataTest = () => {
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testQueries = async () => {
      try {
        console.log('Running test queries...');
        
        // Test 1: Basic query to news_articles
        const { data: articles, error: articlesError } = await supabase
          .from('news_articles')
          .select('*')
          .limit(3);

        if (articlesError) throw articlesError;
        console.log('Articles test query results:', articles);

        // Test 2: Query to news_article_aesthetic_procedures
        const { data: procedures, error: proceduresError } = await supabase
          .from('news_article_aesthetic_procedures')
          .select('*')
          .limit(3);

        if (proceduresError) throw proceduresError;
        console.log('Procedures test query results:', procedures);

        // Test 3: Query to news_articles_with_aesthetic_categories
        const { data: categories, error: categoriesError } = await supabase
          .from('news_articles_with_aesthetic_categories')
          .select('*')
          .limit(3);

        if (categoriesError) throw categoriesError;
        console.log('Categories test query results:', categories);

        setTestData({
          articles,
          procedures,
          categories
        });
      } catch (err) {
        console.error('Test query error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testQueries();
  }, []);

  if (loading) return <Typography>Running test queries...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Supabase Data Test</Typography>
        
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Articles (first 3):</Typography>
        <List dense>
          {testData.articles?.map(article => (
            <ListItem key={article.id}>
              <ListItemText 
                primary={article.title || `Article ${article.id}`}
                secondary={`ID: ${article.id} | Industry: ${article.industry}`}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Procedures (first 3):</Typography>
        <List dense>
          {testData.procedures?.map(proc => (
            <ListItem key={proc.id}>
              <ListItemText 
                primary={`Article ID: ${proc.article_id}`}
                secondary={`Procedure ID: ${proc.procedure_id}`}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Categories (first 3):</Typography>
        <List dense>
          {testData.categories?.map(cat => (
            <ListItem key={cat.id}>
              <ListItemText 
                primary={`Article ID: ${cat.article_id}`}
                secondary={`Category ID: ${cat.category_id}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SupabaseDataTest;
