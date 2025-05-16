import React, { useState, useContext } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  LinearProgress,
  Divider,
  useTheme,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { DataContext } from '../contexts/DataContext';
import CategoryNewsModal from './CategoryNewsModal';
import ArticleIcon from '@mui/icons-material/Article';

const TopCategories = ({ categories, title = "Top Categories" }) => {
  console.log('[DEBUG] TopCategories received:', categories);
  if (categories && categories.length > 0) {
    console.log('[DEBUG] First category object:', categories[0]);
  }
  const theme = useTheme();
  const { industry } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  if (!categories || categories.length === 0) {
    return (
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No categories data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  // Find the maximum article count to normalize progress bars
  const maxArticleCount = Math.max(...categories.map(cat => cat.article_count || 0));
  
  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      sx={{ width: '100%' }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        
        <List disablePadding>
          {categories.map((category, index) => (
            <React.Fragment key={category.category_id || index}>
              <ListItem
                component={motion.div}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{ py: 1.5 }}
                button
                onClick={() => handleCategoryClick(category)}
              >
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
                      {category.category_name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <ArticleIcon fontSize="small" sx={{ color: theme.palette.text.disabled }} />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.text.secondary
                            }}
                          >
                            {category.article_count || 0} articles
                          </Typography>
                          <Button 
                            size="small" 
                            sx={{ ml: 1, minWidth: 'auto', p: '2px 8px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(category);
                            }}
                          >
                            View
                          </Button>
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                          }}
                        >
                          {Math.round((category.article_count || 0) / maxArticleCount * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.round((category.article_count || 0) / maxArticleCount * 100)}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.action.hover,
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              {index < categories.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      
      <CategoryNewsModal
        open={modalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
        industry={industry}
      />
    </Card>
  );
};

export default TopCategories;
