import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { formatFirstLetterUpper, formatWeight } from '../utils/Utils';
import { useNavigate } from 'react-router-dom';

function PokedexTable({ pokemonList }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={80}>#ID</TableCell>
            <TableCell width={80}>Image</TableCell>
            <TableCell sx={{ textAlign: 'left!important' }}>
              Pokémon Name
            </TableCell>
            <TableCell width={80}>Weight</TableCell>
            <TableCell>Types</TableCell>
            <TableCell width={50}>Color</TableCell>
            <TableCell width={50}>Baby</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonList.map(
            ({ id, image, name, weight, types, color, isBaby }) => (
              <TableRow
                key={id}
                sx={styles.row}
                onClick={() => navigate(`/${id}`)}
              >
                <TableCell component='th'>{id}</TableCell>
                <TableCell>
                  <img src={image} alt='sprite' />
                </TableCell>
                <TableCell sx={{ textAlign: 'left!important' }}>
                  {formatFirstLetterUpper(name)}
                </TableCell>
                <TableCell>{formatWeight(weight)}</TableCell>
                <TableCell>
                  {types.map((t) => formatFirstLetterUpper(t)).join(', ')}
                </TableCell>
                <TableCell>
                  <Box
                    sx={styles.colorBox}
                    title={formatFirstLetterUpper(color)}
                  >
                    <Box bgcolor={color} />
                  </Box>
                </TableCell>
                <TableCell>{isBaby}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const styles = {
  table: {
    maxWidth: '800px',
    borderRadius: '20px',
    th: {
      font: '700 18px Lato',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    td: { font: '300 14px Lato', textAlign: 'center' },
    img: {
      heigth: '64px',
    },
    'thead tr': {
      backgroundColor: '#dd0000',
      th: { color: 'white' },
    },
  },
  colorBox: {
    display: 'flex',
    justifyContent: 'center',
    div: {
      width: '20px',
      height: '20px',
      borderRadius: '16px',
      border: '1px solid black',
    },
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f3f3f3',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
      cursor: 'pointer',
    },
  },
};

export default PokedexTable;
