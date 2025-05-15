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
    // Fetch top procedures
    const { data: procedures, error: proceduresError } = await supabase
      .from('repspheresinteldashboardstartingpoint') // Lowercase view name
      .select('procedure_id, industry, procedure_name') // Simplified select
      .limit(5);
      
    if (proceduresError) {
      console.error("Error fetching procedures from RepSpheresIntelDashboardStartingPoint:", proceduresError);
      // Return a structure that won't break the consuming components too much
      return {
        metrics: null,
        procedures: [],
        categories: [],
        marketTrends: [],
        providers: [],
        trendData: []
      };
    }
    
    // For now, return default/empty data for other parts to avoid 404s on missing views
    // The user can address the missing views later if needed.
    return {
      metrics: null, // Or some default metrics object
      procedures: procedures || [],
      categories: [], // Default empty array
      marketTrends: [], // Default empty array
      providers: [], // Default empty array
      trendData: [] // Default empty array
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Ensure a default structure is returned even on critical failure
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
