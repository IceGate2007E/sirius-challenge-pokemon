import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { colors, commonStyles } from '../utils/Common';

function PaginationButtons({
  currentPage,
  setCurrentPage,
  limitPage,
  loading,
}) {
  return (
    <Box sx={styles.container}>
      <Button
        variant='contained'
        disabled={currentPage === 0 || loading}
        onClick={() => setCurrentPage(currentPage - 1)}
        startIcon={<ChevronLeft />}
      >
        Prev
      </Button>
      <Box sx={styles.pageNumber}>
        <span>{currentPage + 1}</span>
      </Box>
      <Button
        variant='contained'
        disabled={currentPage + 1 >= limitPage || loading}
        onClick={() => setCurrentPage(currentPage + 1)}
        endIcon={<ChevronRight />}
      >
        Next
      </Button>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    button: commonStyles.button,
  },
  pageNumber: {
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `4px solid ${colors.secondary}`,
    borderRadius: '30px',
    font: '500 20px Lato',
    backgroundColor: 'white',
  },
};

export default PaginationButtons;
