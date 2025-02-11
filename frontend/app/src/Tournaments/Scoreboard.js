import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';

const scoresPerPage = 16; // Single column, 16 rows

const Scoreboard = ({ scores }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Reset to the first page when scores update
    setCurrentPage(0);
  }, [scores]);

  const pageCount = Math.ceil(scores.length / scoresPerPage);

  // Sort scores in descending order based on points
  const sortedScores = [...scores].sort((a, b) => b.Points - a.Points);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * scoresPerPage;
  const endIndex = startIndex + scoresPerPage;
  const currentScores = sortedScores.slice(startIndex, endIndex);

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2, minWidth: '100%' }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Scoreboard
        </Typography>
        <Grid container spacing={2} direction="column">
          {currentScores.map(({ Name, Wins, Draws, Losses, Points }, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6" sx={{  textAlign: 'center' }}>
                {Name}: {Points} points (W: {Wins}, D: {Draws}, L: {Losses})
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 0}>
            Previous
          </Button>
          <Typography variant="body1" sx={{ mx: 2, alignSelf: 'center' }}>
            Page {currentPage + 1} of {pageCount}
          </Typography>
          <Button variant="contained" onClick={handleNextPage} disabled={currentPage === pageCount - 1}>
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Scoreboard;
