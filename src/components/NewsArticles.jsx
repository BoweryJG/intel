import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip,
  useTheme,
  Button,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FilterListIcon from '@mui/icons-material/FilterList';
import { format } from 'date-fns';

const NewsArticles = ({ 
  procedureArticles = [], 
  categoryArticles = [], 
  title = "Industry News" 
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState({});
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const toggleExpanded = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const renderArticleList = (articles) => {
    if (!articles || articles.length === 0) {
      return (
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No articles available
          </Typography>
        </Box>
      );
    }
    
    return (
      <List disablePadding>
        {articles.map((article, index) => (
          <React.Fragment key={article.article_id || index}>
            <ListItem
              component={motion.li}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{ 
                py: 2,
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 0.5
                      }}
                    >
                      {article.article_title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        {article.procedure_name && (
                          <Chip 
                            label={article.procedure_name}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                        {article.category_name && (
                          <Chip 
                            label={article.category_name}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                        {article.company_name && (
                          <Chip 
                            label={article.company_name}
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </Box>
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
                    </Box>
                  }
                />
                {article.url && (
                  <IconButton 
                    size="small" 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ ml: 1 }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              
              {article.summary && (
                <Box sx={{ mt: 1, width: '100%' }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: expanded[article.article_id] ? 'block' : '-webkit-box',
                      WebkitLineClamp: expanded[article.article_id] ? 'unset' : 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {article.summary}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => toggleExpanded(article.article_id)}
                    sx={{ mt: 0.5, p: 0, minWidth: 'auto' }}
                  >
                    {expanded[article.article_id] ? 'Show less' : 'Read more'}
                  </Button>
                </Box>
              )}
            </ListItem>
            {index < articles.length - 1 && (
              <Divider component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    );
  };
  
  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      sx={{ width: '100%' }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton size="small">
            <FilterListIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            mb: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 'auto',
              px: 2
            }
          }}
        >
          <Tab label="By Procedure" />
          <Tab label="By Category" />
        </Tabs>
        
        <Box role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && renderArticleList(procedureArticles)}
        </Box>
        
        <Box role="tabpanel" hidden={tabValue !== 1}>
          {tabValue === 1 && renderArticleList(categoryArticles)}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsArticles;
