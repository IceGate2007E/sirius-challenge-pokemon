import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';

function ListCollapse({ title, data, height = 'unset' }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={styles.container}>
      <span style={styles.title} onClick={() => setOpen(!open)}>
        {open ? '-' : '+'} {title}
        {open ? ':' : ''}
      </span>
      <Collapse in={open}>
        <Box sx={styles.list} height={height}>
          {data.map((item, index) => (
            <span key={index}>
              <b>{item.name}:</b> {item.value}
            </span>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  title: { cursor: 'pointer', font: '700 16px Lato' },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    paddingTop: '4px',
    font: '500 14px Lato',
  },
};

export default ListCollapse;
