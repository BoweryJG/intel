import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';
import { 
  fetchDashboardData, 
  fetchNewsArticlesByProcedures,
  fetchNewsArticlesByCategories
} from '../services/supabaseClient';

export const DataContext = createContext({
  data: null,
  newsArticles: {
    byProcedures: [],
    byCategories: []
  },
  loading: true,
  error: null,
  refetchData: () => {},
});

export const DataProvider = ({ children }) => {
  const { themeMode } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [newsArticles, setNewsArticles] = useState({
    byProcedures: [],
    byCategories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Map theme mode to industry
  const industry = themeMode === 'dental' ? 'dental' : 'aesthetic';
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch dashboard data
      const dashboardData = await fetchDashboardData(industry);
      setData(dashboardData);
      
      // Fetch news articles related to procedures and categories
      const procedureArticles = await fetchNewsArticlesByProcedures(industry);
      const categoryArticles = await fetchNewsArticlesByCategories(industry);
      
      setNewsArticles({
        byProcedures: procedureArticles || [],
        byCategories: categoryArticles || []
      });
      
      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [industry]);
  
  // Fetch data when the industry (theme) changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const contextValue = {
    data,
    newsArticles,
    loading,
    error,
    refetchData: fetchData,
    industry
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
