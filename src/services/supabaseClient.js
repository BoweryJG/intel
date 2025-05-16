import { createClient } from '@supabase/supabase-js';

// Hardcode credentials directly to bypass environment variable issues
const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Immediate connection test
supabase.from('aesthetic_procedures')
  .select('count')
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection failed:', error);
    } else {
      console.log('Supabase connection SUCCESSFUL:', data);
    }
  });

// Fetch news articles related to procedures for a specific industry
export const fetchNewsArticlesByProcedures = async (industry, limit = 10) => {
  try {
    const viewName = industry === 'aesthetic' 
      ? 'v_news_articles_aesthetic_procedures' 
      : 'v_news_articles_dental_procedures';
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .order('article_id', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${industry} news articles by procedures:`, error);
    throw error;
  }
};

// Fetch news articles related to categories for a specific industry
export const fetchNewsArticlesByCategories = async (industry, limit = 10) => {
  try {
    const viewName = industry === 'aesthetic' 
      ? 'v_news_articles_aesthetic_categories' 
      : 'v_news_articles_dental_categories';
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .order('article_id', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${industry} news articles by categories:`, error);
    throw error;
  }
};

// Fetch news articles for a specific procedure
export const fetchNewsArticlesByProcedure = async (industry, procedureId, limit = 5) => {
  try {
    const viewName = industry === 'aesthetic' 
      ? 'v_news_articles_aesthetic_procedures' 
      : 'v_news_articles_dental_procedures';
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .eq('procedure_id', procedureId)
      .order('article_id', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching news articles for procedure ${procedureId}:`, error);
    throw error;
  }
};

// Fetch news articles for a specific category
export const fetchNewsArticlesByCategory = async (industry, categoryId, limit = 5) => {
  try {
    const viewName = industry === 'aesthetic' 
      ? 'v_news_articles_aesthetic_categories' 
      : 'v_news_articles_dental_categories';
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .eq('category_id', categoryId)
      .order('article_id', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching news articles for category ${categoryId}:`, error);
    throw error;
  }
};

// Fetch dashboard data using the correct tables that actually exist
export const fetchDashboardData = async (industry) => {
  try {
    console.log(`Fetching dashboard data for industry: ${industry}`);
    
    // Query the appropriate table based on industry
    const tableName = industry === 'aesthetic' ? 'aesthetic_procedures' : 'dental_procedures';
    console.log(`Using table: ${tableName}`);
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    
    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
    }
    
    console.log(`Successfully retrieved ${data?.length || 0} records from ${tableName}`);
    
    // Return structured data with what we have
    return {
      metrics: {
        total_articles: data?.length || 0,
        article_growth_rate: 0,
        total_procedures: data?.length || 0,
        procedure_growth_rate: 0,
        total_categories: 0,
        total_providers: 0,
        provider_growth_rate: 0
      },
      procedures: data || [],
      categories: [],
      marketTrends: [],
      providers: [],
      trendData: []
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      metrics: null,
      procedures: [],
      categories: [],
      marketTrends: [],
      providers: [],
      trendData: []
    };
  }
};
