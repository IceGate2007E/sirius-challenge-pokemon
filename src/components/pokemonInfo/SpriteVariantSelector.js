import { AutoAwesome, Female, Male, ThreeSixty } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GenderlessIcon } from '../../assets/GenderlessIcon';

function SpriteVariantSelector({ sprites, setVariant }) {
  const [shiny, setShiny] = useState(false);
  const [female, setFemale] = useState(false);
  const [back, setBack] = useState(false);

  const isShinyAvailable = sprites.front_shiny !== null;
  const shinyIconColor = {
    color: isShinyAvailable ? (shiny ? 'gold' : 'black') : 'lightgray',
  };
  const toggleShiny = () => {
    if (isShinyAvailable) setShiny(!shiny);
  };

  const isFemaleAvailable =
    sprites[`${back ? 'back' : 'front'}_${shiny ? 'shiny_female' : 'female'}`];
  const toggleFemale = () => {
    if (isFemaleAvailable) setFemale(!female);
  };

  const isBackAvailable =
    sprites[
      `back_${
        shiny
          ? female
            ? 'shiny_female'
            : 'shiny'
          : female
          ? 'female'
          : 'default'
      }`
    ] !== null;
  const backIconColor = {
    color: isBackAvailable ? (back ? 'red' : 'black') : 'lightgray',
  };
  const toggleBack = () => {
    if (isBackAvailable) setBack(!back);
  };

  useEffect(() => {
    setVariant(
      `${back ? 'back' : 'front'}_${
        shiny
          ? female
            ? 'shiny_female'
            : 'shiny'
          : female
          ? 'female'
          : 'default'
      }`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiny, female, back]);

  return (
    <Box display='flex' gap='20px'>
      <Box
        title='Shiny'
        onClick={toggleShiny}
        sx={{ cursor: isShinyAvailable ? 'pointer' : 'unset' }}
      >
        <AutoAwesome sx={shinyIconColor} />
      </Box>
      <Box
        title='Gender'
        onClick={toggleFemale}
        sx={{
          cursor: isFemaleAvailable ? 'pointer' : 'unset',
        }}
      >
        {isFemaleAvailable ? (
          female ? (
            <Female sx={{ color: 'magenta' }} />
          ) : (
            <Male sx={{ color: 'blue' }} />
          )
        ) : (
          <GenderlessIcon />
        )}
      </Box>
      <Box
        title='Side'
        onClick={toggleBack}
        sx={{
          cursor: isBackAvailable ? 'pointer' : 'unset',
        }}
      >
        <ThreeSixty sx={backIconColor} />
      </Box>
    </Box>
  );
}

export default SpriteVariantSelector;
