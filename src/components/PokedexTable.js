import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { formatFirstLetterUpper } from '../utils/Utils';
import { useNavigate } from 'react-router-dom';

import UnknownImage from '../assets/unknown.png';
import { colors } from '../utils/Common';
import ColorBox from './pokemonInfo/ColorBox';

function PokedexTable({ pokemonList }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={styles.table}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell width={80}>#ID</TableCell>
            <TableCell width={80}>Image</TableCell>
            <TableCell sx={{ textAlign: 'left!important' }}>
              Pokémon Name
            </TableCell>
            <TableCell width={80}>Weight</TableCell>
            <TableCell width={160}>Types</TableCell>
            <TableCell width={40}>Color</TableCell>
            <TableCell width={60}>Special</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonList.map(
            ({ id, image, name, weight, types, color, special }) => (
              <TableRow
                key={id}
                sx={styles.row}
                onClick={() => navigate(`/pokemon/${id}`)}
              >
                <TableCell component='th'>{id}</TableCell>
                <TableCell>
                  <img src={image || UnknownImage} alt='sprite' />
                </TableCell>
                <TableCell sx={{ textAlign: 'left!important' }}>
                  {formatFirstLetterUpper(name)}
                </TableCell>
                <TableCell>{weight / 10} Kg</TableCell>
                <TableCell>
                  {types.map((t) => formatFirstLetterUpper(t)).join(', ')}
                </TableCell>
                <TableCell>
                  <ColorBox color={color} />
                </TableCell>
                <TableCell>
                  {special !== '' && formatFirstLetterUpper(special)}
                </TableCell>
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
    img: { height: '50px' },
    'thead tr': {
      backgroundColor: colors.primary,
      th: { color: 'white' },
    },
  },
  row: {
    '&:nth-of-type(even)': { backgroundColor: colors.grey },
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': {
      backgroundColor: colors.darkgrey,
      cursor: 'pointer',
    },
  },
};

export default PokedexTable;
