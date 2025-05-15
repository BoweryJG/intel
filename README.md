# Intel Dashboard Project

## Overview
The Intel Dashboard will provide comprehensive analytics and insights for aesthetic and dental industries, leveraging data from news articles, procedures, market trends, and provider information. The dashboard will visualize key metrics and recommendations to support strategic decision-making.

## Data Structure
The dashboard will use optimized Supabase views that provide clean, consistent data with proper null handling and descriptive column names:

1. **Industry Metrics** - Overview of industry performance metrics
   - Key metrics: total articles, unique procedures, unique categories, trending topics, market trends
   - Performance indicators: avg topic relevance, avg trend impact, avg expected growth

2. **Procedures** - Detailed procedure analytics and related data
   - Key data: procedure name, company name, article mentions, categories count, related trends count
   - Performance metrics: avg trend impact, avg expected growth
   - Related data: related trends, related categories

3. **Market Trends** - Analysis of emerging market trends with impact scores
   - Key data: trend name, trend description, impact score, expected growth rate, adoption timeline
   - Related data: related procedures count, related procedures

4. **Categories** - Performance metrics for procedure categories
   - Key data: category name, article count, procedure count, trending topics count, market trends count
   - Related data: related procedures

5. **Trending Topics** - News article topic analysis
   - Key data: topic, keywords, relevance score, source articles count, article mentions
   - Related data: related procedures count, related procedures

6. **Recommendations** - Suggested new categories and procedures based on trends
   - Key data: recommendation type, name, impact score, expected growth rate, adoption timeline, description

7. **Regional Insights** - Geographic market data and growth rates
   - Key data: region, country, avg growth rate, total market size, procedure count, latest year

8. **Providers** - Provider information and related market trends
   - Key data: provider name, address, average rating, website, market, primary procedures
   - Related data: related market trends count, related market trends

## Dashboard Features
- Industry filter to toggle between aesthetic and dental data
- Key performance metrics cards
- Interactive charts and visualizations
- Recommendation panels for new business opportunities
- Provider mapping and analytics
- Trend impact analysis with growth projections

## Technical Implementation
- React-based frontend with responsive design
- Supabase for backend data storage and querying
- Data visualization libraries (Chart.js, D3.js, or similar)
- Authentication and user management

## Dashboard Layout
1. **Top Section**: Industry metrics cards (v_dashboard_industry_metrics)
2. **Middle Section**: Tabs for Procedures, Categories, Market Trends, and Recommendations
3. **Bottom Section**: Provider information and Regional insights

## Component Structure
- IndustryMetricsPanel (overview cards)
- ProceduresTable (sortable/filterable)
- CategoriesTable (sortable/filterable)
- MarketTrendsPanel (with impact score visualization)
- RecommendationsPanel (split by category/procedure)
- ProvidersMap (geographic visualization)
- RegionalInsightsChart (market size/growth visualization)

## Data Visualization
- Bar charts for comparing metrics across categories/procedures
- Line charts for growth rates and trends
- Heat maps for regional insights
- Star ratings for provider ratings
- Impact score visualizations using color gradients
