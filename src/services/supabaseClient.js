import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// Fetch dashboard data including metrics, procedures, categories, and trends
export const fetchDashboardData = async (industry) => {
  try {
    // Fetch industry metrics
    const { data: metrics, error: metricsError } = await supabase
      .from('v_dashboard_industry_metrics')
      .select('*')
      .eq('industry', industry)
      .single();
      
    if (metricsError) throw metricsError;
    
    // Fetch top procedures
    const { data: procedures, error: proceduresError } = await supabase
      .from('v_dashboard_procedures')
      .select('*')
      .eq('industry', industry)
      .order('article_mentions', { ascending: false })
      .limit(5);
      
    if (proceduresError) throw proceduresError;
    
    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('v_dashboard_categories')
      .select('*')
      .eq('industry', industry)
      .order('article_count', { ascending: false })
      .limit(5);
      
    if (categoriesError) throw categoriesError;
    
    // Fetch market trends
    const { data: marketTrends, error: trendsError } = await supabase
      .from('v_dashboard_market_trends')
      .select('*')
      .eq('industry', industry)
      .order('impact_score', { ascending: false })
      .limit(5);
      
    if (trendsError) throw trendsError;
    
    // Fetch providers
    const { data: providers, error: providersError } = await supabase
      .from('v_dashboard_providers')
      .select('*')
      .eq('industry', industry)
      .order('average_rating', { ascending: false })
      .limit(5);
      
    if (providersError) throw providersError;
    
    // Create trend data for charts
    const trendData = marketTrends.map(trend => ({
      name: trend.trend_name,
      value: trend.expected_growth_rate,
      impact: trend.impact_score
    }));
    
    return {
      metrics,
      procedures,
      categories,
      marketTrends,
      providers,
      trendData
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
