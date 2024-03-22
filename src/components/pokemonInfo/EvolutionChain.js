import { DoubleArrow, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Tooltip, Zoom } from '@mui/material';
import React, { useState } from 'react';
import CardChain from './CardChain';
import { colors } from '../../utils/Common';
import { formatFirstLetterUpper } from '../../utils/Utils';

function EvolutionNode({ chain, actual }) {
  const [pointer, setPointer] = useState(0);
  const name = chain.species.name;
  const id = chain.species.url.match(/\/(\d+)\/$/)[1];
  const selected = actual === name;

  const hasPrev = pointer !== 0;
  const hasNext = pointer !== chain.evolves_to.length - 1;

  const goBack = () => {
    if (hasPrev) setPointer(pointer - 1);
  };
  const goNext = () => {
    if (hasNext) setPointer(pointer + 1);
  };

  return (
    <>
      <CardChain {...{ name, id, selected }} />
      {chain.evolves_to.length > 0 && (
        <>
          <Box sx={styles.arrows}>
            <div
              style={{ cursor: hasPrev ? 'pointer' : 'unset' }}
              onClick={() => goBack()}
            >
              {hasPrev && <ExpandLess />}
            </div>
            <Tooltip
              PopperProps={{ sx: styles.tooltip }}
              title={
                <>
                  {chain.evolves_to[pointer].evolution_details.map(
                    (item, i) => (
                      <Box key={i} sx={styles.trigger}>
                        <span>
                          <b>Trigger:</b>{' '}
                          {formatFirstLetterUpper(item.trigger.name)}
                        </span>
                        {Object.entries(item)
                          .filter(
                            ([key, value]) =>
                              value !== null &&
                              value !== '' &&
                              value !== false &&
                              key !== 'trigger'
                          )
                          .map(([key, value]) => [
                            key,
                            typeof value === 'object' ? value.name : value,
                          ])
                          .map(([key, value], index) => (
                            <span key={index}>
                              {`${formatFirstLetterUpper(key)}${
                                value !== true
                                  ? `: ${formatFirstLetterUpper(String(value))}`
                                  : ''
                              }`}
                            </span>
                          ))}
                      </Box>
                    )
                  )}
                </>
              }
              placement='left'
              TransitionComponent={Zoom}
            >
              <DoubleArrow />
            </Tooltip>
            <div
              style={{ cursor: hasNext ? 'pointer' : 'unset' }}
              onClick={() => goNext()}
            >
              {hasNext && <ExpandMore />}
            </div>
          </Box>
          <EvolutionNode chain={chain.evolves_to[pointer]} actual={actual} />
        </>
      )}
    </>
  );
}

function EvolutionChain({ chain, actual }) {
  return (
    <Box sx={styles.container}>
      <EvolutionNode {...{ chain, actual }} />
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
    justifyContent: 'center',
  },
  arrows: {
    height: '72px',
    display: 'flex',
    flexDirection: 'column',
    div: { height: '24px' },
  },
  tooltip: {
    marginRight: '0px',
    '& .MuiTooltip-tooltip': {
      color: 'white',
      backgroundColor: colors.secondary,
      font: '500 16px Lato',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '200px',
      gap: '8px',
      padding: '8px',
    },
  },
  trigger: {
    display: 'flex',
    flexDirection: 'column',
    'span:not(:first-of-type)': {
      paddingLeft: '8px',
      fontSize: '14px',
    },
  },
};

export default EvolutionChain;
