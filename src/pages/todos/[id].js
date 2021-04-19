import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TodoDetail from '../../components/TodoDetail';

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo Detail
        </Typography>
        <TodoDetail />
      </Box>
    </Container>
  );
};

export default Index;
