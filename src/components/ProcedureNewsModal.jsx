import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { fetchNewsArticlesByProcedure } from '../services/supabaseClient';
import { format } from 'date-fns';

const ProcedureNewsModal = ({ 
  open, 
  onClose, 
  procedure, 
  industry 
}) => {
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadArticles = async () => {
      if (!open || !procedure?.id) return;
      
      setLoading(true);
      try {
        const data = await fetchNewsArticlesByProcedure(industry, procedure.id);
        setArticles(data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading procedure news articles:', err);
        setError('Failed to load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [open, procedure, industry]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  if (!procedure) return null;
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {procedure.name}
        </Typography>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose} 
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Box sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {procedure.category_name && (
            <Chip 
              label={procedure.category_name}
              size="small"
              color="secondary"
            />
          )}
          {procedure.company_name && (
            <Chip 
              label={procedure.company_name}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {procedure.avg_expected_growth && (
            <Chip 
              label={`${procedure.avg_expected_growth}% growth`}
              size="small"
              color={(procedure.avg_expected_growth > 0) ? "success" : "error"}
            />
          )}
        </Box>
      </Box>
      
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Related News Articles
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ py: 2 }}>
            {error}
          </Typography>
        ) : articles.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2 }}>
            No news articles found for this procedure.
          </Typography>
        ) : (
          <List disablePadding>
            {articles.map((article, index) => (
              <React.Fragment key={article.article_id || index}>
                <ListItem sx={{ py: 2, px: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            pr: 2
                          }}
                        >
                          {article.article_title}
                        </Typography>
                        {article.url && (
                          <IconButton 
                            size="small" 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          {formatDate(article.published_date)}
                          {article.source && (
                            <>
                              <Box 
                                component="span" 
                                sx={{ 
                                  width: '4px', 
                                  height: '4px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'text.disabled' 
                                }} 
                              />
                              {article.source}
                            </>
                          )}
                        </Typography>
                        
                        {article.summary && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            {article.summary}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < articles.length - 1 && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProcedureNewsModal;
