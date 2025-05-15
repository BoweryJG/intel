import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Container, Grid, Card, CardContent, Typography, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

// --- Supabase setup ---
const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from the most comprehensive view
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase.from('v_comprehensive_analytics_dashboard').select('*');
      if (!error) setDashboardData(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comprehensive Analytics Dashboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {/* Example: Display key metrics as cards */}
          {dashboardData.length > 0 && Object.entries(dashboardData[0]).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{key.replace(/_/g, ' ')}</Typography>
                  <Typography variant="h5">{String(value)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Example: Data Table for full view */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Raw Data Table</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {dashboardData[0] && Object.keys(dashboardData[0]).map((col) => (
                        <TableCell key={col}>{col.replace(/_/g, ' ')}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.map((row, idx) => (
                      <TableRow key={idx}>
                        {Object.values(row).map((val, i) => (
                          <TableCell key={i}>{String(val)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
