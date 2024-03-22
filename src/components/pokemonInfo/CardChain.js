import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { formatFirstLetterUpper } from '../../utils/Utils';
import Unknown from '../../assets/unknown.png';
import { colors } from '../../utils/Common';

function CardChain({ name, id, selected }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={[
        styles.card,
        selected
          ? { div: { outline: `solid 2px ${colors.secondary}` } }
          : { cursor: 'pointer' },
      ]}
      onClick={() => {
        if (!selected) navigate(`/pokemon/${id}`);
      }}
    >
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt='sprite'
          onError={(e) => (e.target.src = Unknown)}
        />
      </div>
      <span>{formatFirstLetterUpper(name)}</span>
    </Box>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '72px',
    gap: '4px',
    alignItems: 'center',
    textAlign: 'center',
    div: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '72px',
      height: '72px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: '40px',
      overflow: 'hidden',
    },
    img: {
      width: '60px',
      height: '60px',
    },
    span: {
      font: '500 12px Lato',
      textWrap: 'wrap',
    },
  },
};

export default CardChain;
