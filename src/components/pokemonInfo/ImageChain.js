import { Box } from '@mui/material';
import React from 'react';
import CardChain from './CardChain';

function ImageChain({ data, actual }) {
  return (
    <Box sx={styles.container}>
      {data.map((item, index) => (
        <CardChain
          key={index}
          name={item.name}
          id={item.url.match(/\/(\d+)\/$/)[1]}
          selected={actual === item.name}
        />
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    padding: '8px',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    columnGap: '40px',
    justifyContent: 'center',
  },
};

export default ImageChain;
