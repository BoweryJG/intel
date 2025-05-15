import React, { useState, useContext } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Chip,
  Divider,
  useTheme,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { DataContext } from '../contexts/DataContext';
import ProcedureNewsModal from './ProcedureNewsModal';
import ArticleIcon from '@mui/icons-material/Article';

const TopProcedures = ({ procedures, title = "Top Procedures" }) => {
  const theme = useTheme();
  const { industry } = useContext(DataContext);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleProcedureClick = (procedure) => {
    setSelectedProcedure(procedure);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  if (!procedures || procedures.length === 0) {
    return (
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No procedures data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{ width: '100%' }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        
        <List disablePadding>
          {procedures.map((procedure, index) => (
            <React.Fragment key={procedure.id || index}>
              <ListItem
                component={motion.li}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{ py: 1.5 }}
                button
                onClick={() => handleProcedureClick(procedure)}
              >
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 500,
                        color: theme.palette.text.primary
                      }}
                    >
                      {procedure.name}
                    </Typography>
                  }
                  secondary={
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
                        {procedure.article_mentions || 0} articles
                      </Typography>
                      <Button 
                        size="small" 
                        sx={{ ml: 1, minWidth: 'auto', p: '2px 8px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProcedureClick(procedure);
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip 
                    label={`${procedure.avg_expected_growth || 0}%`}
                    color={(procedure.avg_expected_growth || 0) > 0 ? "success" : "error"}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      minWidth: '60px',
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {index < procedures.length - 1 && (
                <Divider component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      
      <ProcedureNewsModal
        open={modalOpen}
        onClose={handleCloseModal}
        procedure={selectedProcedure}
        industry={industry}
      />
    </Card>
  );
};

export default TopProcedures;
