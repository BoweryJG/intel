# Intel Dashboard

A modern, responsive dashboard for visualizing dental and aesthetic procedure intelligence data from Supabase.

## Features

- **Dual Theme Support**: Toggle between dental and aesthetic industry views with custom themes
- **Real-time Data**: Connects to Supabase for up-to-date industry intelligence
- **Interactive Charts**: Visualize market trends and growth rates
- **Responsive Design**: Works on desktop and mobile devices
- **Animated UI**: Smooth transitions and animations for better user experience

## Tech Stack

- React 18
- Material UI 5
- Supabase (Backend)
- Recharts (Data visualization)
- Framer Motion (Animations)

## Project Structure

```
src/
├── components/         # UI components
│   ├── Dashboard.jsx   # Main dashboard layout
│   ├── Header.jsx      # App header with theme toggle
│   ├── MetricsCard.jsx # Individual metric display
│   ├── TopCategories.jsx # Categories list component
│   ├── TopProcedures.jsx # Procedures list component
│   └── TrendChart.jsx  # Chart component
├── contexts/           # React contexts
│   ├── DataContext.jsx # Data fetching and state management
│   └── ThemeContext.jsx # Theme switching functionality
├── services/           # External service connections
│   └── supabaseClient.js # Supabase connection and queries
├── theme/              # Theme definitions
│   ├── aestheticTheme.js # Aesthetic industry theme
│   └── dentalTheme.js  # Dental industry theme
├── App.jsx             # Main application component
└── index.js            # Application entry point
```

## Setup Instructions

1. Clone the repository
   ```
   git clone <repository-url>
   cd intel-dashboard
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials
   ```
   REACT_APP_SUPABASE_KEY=your-anon-key
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the dashboard in your browser

## Database Schema

The dashboard expects the following views in your Supabase database:

- `v_dashboard_industry_metrics` - Overall metrics for each industry
- `v_dashboard_procedures` - Top procedures with article mentions and growth rates
- `v_dashboard_categories` - Categories with article counts
- `v_dashboard_market_trends` - Market trends with impact scores and growth rates
- `v_dashboard_providers` - Provider information with ratings

## Customization

- Edit theme files in `src/theme/` to customize colors and styling
- Modify components in `src/components/` to change layout and functionality
- Update Supabase queries in `src/services/supabaseClient.js` to fetch different data

## License

MIT
