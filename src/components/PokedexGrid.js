import { Box } from '@mui/material';
import Atropos from 'atropos/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../utils/Common';
import { formatFirstLetterUpper } from '../utils/Utils';
import UnknownImage from '../assets/unknown.png';
import ColorBox from './pokemonInfo/ColorBox';

function PokedexGrid({ pokemonList }) {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      {pokemonList.map(({ id, image, name, weight, types, color, special }) => (
        <Atropos
          key={id}
          shadowScale={0.75}
          shadowOffset={100}
          duration={200}
          activeOffset={40}
          onClick={() => navigate(`/pokemon/${id}`)}
        >
          <Box sx={styles.card}>
            <span>{special !== '' && special.toUpperCase()}</span>
            <img src={image || UnknownImage} alt='image' />
            <span style={{ font: '700 20px Lato', marginBottom: '8px' }}>
              {formatFirstLetterUpper(name)}
            </span>
            <span>
              <b>Types:</b>{' '}
              {types.map((t) => formatFirstLetterUpper(t)).join(', ')}
            </span>
            <span>
              <b>Weight:</b> {weight / 10} Kg
            </span>
            <Box sx={styles.bottomCard}>
              #{id}
              <ColorBox color={color} />
            </Box>
          </Box>
        </Atropos>
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '20px 32px',
    gap: '32px',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFB',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '20px',
    padding: '16px',
    alignItems: 'center',
    font: '500 16px Lato',
    gap: '4px',
    'span:first-child': {
      position: 'absolute',
      font: '700 12px Lato',
      ...commonStyles.rainbowText,
    },
    img: {
      height: '200px',
    },
  },
  bottomCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginTop: '16px',
    alignItems: 'flex-end',
  },
};

export default PokedexGrid;
