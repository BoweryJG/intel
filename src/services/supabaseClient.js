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

// Fetch dashboard data using the comprehensive views
export const fetchDashboardData = async (industry = 'dental') => {
  try {
    console.log(`Fetching dashboard data for industry: ${industry}`);
    
    // Fetch all dashboard data in parallel
    const [
      { data: metricsData },
      { data: proceduresData },
      { data: categoriesData },
      { data: marketTrendsData },
      { data: providersData }
    ] = await Promise.all([
      supabase
        .from('v_dashboard_industry_metrics')
        .select('*')
        .eq('industry', industry)
        .single(),
      
      supabase
        .from('v_dashboard_procedures')
        .select('*')
        .eq('industry', industry)
        .order('article_mentions', { ascending: false })
        .limit(10),
      
      supabase
        .from('v_dashboard_categories')
        .select('*')
        .eq('industry', industry)
        .order('article_count', { ascending: false }),
      
      supabase
        .from('v_dashboard_market_trends')
        .select('*')
        .eq('industry', industry)
        .order('impact_score', { ascending: false })
        .limit(5),
      
      supabase
        .from('v_dashboard_providers')
        .select('*')
        .eq('industry', industry)
        .order('average_rating', { ascending: false })
        .limit(5)
    ]);
    
    console.log('Dashboard data fetched successfully');
    
    // Format the data for the frontend
    return {
      metrics: metricsData || {
        industry,
        total_articles: 0,
        total_procedures: 0,
        total_categories: 0,
        total_providers: 0,
        article_growth_rate: 0,
        procedure_growth_rate: 0,
        provider_growth_rate: 0
      },
      procedures: proceduresData || [],
      categories: categoriesData || [],
      marketTrends: marketTrendsData || [],
      providers: providersData || [],
      trendData: marketTrendsData?.map(trend => ({
        name: trend.trend_name,
        value: trend.impact_score,
        growth: trend.expected_growth_rate
      })) || []
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
