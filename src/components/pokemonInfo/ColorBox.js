import { Box } from '@mui/material';
import React from 'react';
import { formatFirstLetterUpper } from '../../utils/Utils';

function ColorBox({ color }) {
  return (
    <Box sx={styles.container} title={formatFirstLetterUpper(color)}>
      <Box bgcolor={color} />
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    div: {
      width: '18px',
      height: '18px',
      borderRadius: '16px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
  },
};

export default ColorBox;
