import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../assets/pokeball-loader.gif';
import { Box, Button, Collapse, MenuItem, Select } from '@mui/material';
import { formatFirstLetterUpper, formatGenTitle } from '../utils/Utils';

import Unknown from '../assets/unknown-hd.png';
import { ChevronLeft, VolumeDown, VolumeUp } from '@mui/icons-material';
import ReactAudioPlayer from 'react-audio-player';
import SpriteVariantSelector from '../components/pokemonInfo/SpriteVariantSelector';
import MapObjectSelect from '../components/pokemonInfo/MapObjectSelect';
import SpriteGenSelects from '../components/pokemonInfo/SpriteGenSelects';
import Atropos from 'atropos/react';
import axios from 'axios';
import { colors, commonStyles } from '../utils/Common';
import ListCollapse from '../components/pokemonInfo/ListCollapse';
import ColorBox from '../components/pokemonInfo/ColorBox';
import ImageChain from '../components/pokemonInfo/ImageChain';
import EvolutionChain from '../components/pokemonInfo/EvolutionChain';

const mobile = 'max-width: 700px';

function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [spriteOption, setSpriteOption] = useState('default');
  const [imageUrl, setImageUrl] = useState('default');
  const [defaultVariant, setDefaultVariant] = useState('front_default');
  const imageSrc =
    (spriteOption === 'default'
      ? pokemon?.sprites[defaultVariant]
      : imageUrl) || Unknown;

  const playerRef = useRef(null);
  const [playingSound, setPlayingSound] = useState(false);

  const [open, setOpen] = useState(true);

  const handleChangeOption = (event) => {
    let value = event.target.value;
    if (value === 'default') setDefaultVariant('front_default');
    else setImageUrl(Unknown);
    setSpriteOption(value);
  };
  const handleChangeVariant = (value) => {
    setDefaultVariant(value);
    setLoadingImage(true);
  };
  const handleImageSelected = (value) => {
    if (value !== imageUrl) {
      setImageUrl(value);
      setLoadingImage(true);
    }
  };
  const playSound = () => {
    playerRef.current.audioEl.current.play();
  };

  const fetchData = (id) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        const data = res.data;
        const speciesPromise = axios.get(data.species.url).then((species) => {
          data.species = species.data;
          return axios
            .get(data.species.evolution_chain.url)
            .then((evolution) => {
              data.species.evolution_chain = evolution.data;
            });
        });
        const abilitiesPromise = Promise.all(
          data.abilities.map((ability) => axios.get(ability.ability.url))
        ).then((abilities) => {
          data.abilities = abilities.map((ability) => ability.data);
        });

        Promise.all([speciesPromise, abilitiesPromise]).then(() => {
          setPokemon(data);
          if (data.species.varieties.length > 6) setOpen(false);
          else setOpen(true);
        });
      })
      .catch(() => navigate('/'));
  };

  useEffect(() => {
    setPokemon(null);
    setSpriteOption('default');
    setPlayingSound(false);
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const spriteComponents = {
    default: (
      <SpriteVariantSelector
        sprites={pokemon?.sprites}
        setVariant={handleChangeVariant}
      />
    ),
    other: (
      <MapObjectSelect
        object={pokemon?.sprites.other}
        setValue={handleImageSelected}
        style={styles.select}
      />
    ),
    versions: (
      <SpriteGenSelects
        generations={pokemon?.sprites.versions}
        setValue={handleImageSelected}
        style={styles.select}
      />
    ),
  };

  return (
    <Box sx={styles.container}>
      <Box sx={commonStyles.title}>POKÉMON INFO</Box>
      {!pokemon ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <Box sx={styles.card}>
          <Box sx={styles.cardHeader}>
            <Box sx={styles.id}>{`#${pokemon.id}`}</Box>
            {formatFirstLetterUpper(pokemon.name)}
            <ReactAudioPlayer
              ref={playerRef}
              src={pokemon.cries.latest}
              onPlay={() => setPlayingSound(true)}
              onEnded={() => setPlayingSound(false)}
            />
            <Box sx={styles.sound} onClick={playSound}>
              {playingSound ? <VolumeUp /> : <VolumeDown />}
            </Box>
          </Box>
          <Box sx={styles.cardBody}>
            {(pokemon.species.is_mythical ||
              pokemon.species.is_legendary ||
              pokemon.species.is_baby) && (
              <Box sx={styles.specials}>
                {pokemon.species.is_mythical && <span>MYTHICAL</span>}
                {pokemon.species.is_legendary && <span>LEGENDARY</span>}
                {pokemon.species.is_baby && <span>BABY</span>}
              </Box>
            )}
            <Box sx={styles.leftSide}>
              <Atropos
                shadowScale={0.75}
                shadowOffset={100}
                duration={200}
                activeOffset={40}
              >
                <Box sx={styles.image}>
                  <img
                    height={loadingImage ? '0px' : '90%'}
                    src={imageSrc}
                    alt='sprite'
                    onLoad={() => setLoadingImage(false)}
                  />
                  {loadingImage && (
                    <img height={'80px'} src={Spinner} alt='spinner' />
                  )}
                </Box>
              </Atropos>
              <Select
                sx={styles.select}
                value={spriteOption}
                onChange={handleChangeOption}
                size='small'
                fullWidth
                MenuProps={{ PaperProps: { sx: commonStyles.menuItem } }}
              >
                <MenuItem value='default'>Default</MenuItem>
                <MenuItem value='other'>Others</MenuItem>
                <MenuItem value='versions'>Versions</MenuItem>
              </Select>
              {spriteComponents[spriteOption]}
            </Box>
            <Box sx={styles.separator} />
            <Box sx={styles.rightSide}>
              <span>
                <b>Height:</b> {pokemon.height / 10} m
              </span>
              <span>
                <b>Weight:</b> {pokemon.weight / 10} Kg
              </span>
              <span>
                <b>Type{pokemon.types.length > 1 ? 's' : ''}:</b>{' '}
                {pokemon.types
                  .map((item) => formatFirstLetterUpper(item.type.name))
                  .join(', ')}
              </span>
              <Box display='flex' gap='8px'>
                <span>
                  <b>Color:</b>
                </span>
                <ColorBox color={pokemon.species.color.name} />
              </Box>
              {pokemon.species.varieties.length > 1 && (
                <Box display='flex' flexDirection='column'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(!open)}
                  >
                    <b>{`${open ? '-' : '+'} Varieties (${
                      pokemon.species.varieties.length
                    })${open ? ':' : ''}`}</b>
                  </span>
                  <Collapse in={open}>
                    <ImageChain
                      data={pokemon.species.varieties.map((v) => v.pokemon)}
                      actual={pokemon.name}
                    />
                  </Collapse>
                </Box>
              )}
              <span>
                <b>Evolution Chain:</b>
              </span>
              <EvolutionChain
                chain={pokemon.species.evolution_chain.chain}
                actual={pokemon.name}
              />
              <ListCollapse
                title={`Abilities (${pokemon.abilities.length})`}
                data={pokemon.abilities.map((item) => ({
                  name: `(${formatGenTitle(
                    item.generation.name
                  )}) ${formatFirstLetterUpper(item.name)}`,
                  value:
                    item.effect_entries.filter(
                      (a) => a.language.name === 'en'
                    )[0]?.effect || 'No description.',
                }))}
              />
              <ListCollapse
                title='Base Stats'
                data={pokemon.stats.map((item) => ({
                  name: formatFirstLetterUpper(item.stat.name),
                  value: item.base_stat,
                }))}
                height='64px'
              />
            </Box>
          </Box>
        </Box>
      )}
      <Button
        variant='contained'
        onClick={() => navigate('/')}
        startIcon={<ChevronLeft />}
      >
        Back
      </Button>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    margin: '32px',
    button: commonStyles.button,
  },
  card: {
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    maxWidth: '720px',
    width: '100%',
    overflow: 'hidden',
    [`@media (${mobile})`]: {
      minWidth: '300px',
    },
  },
  image: {
    height: '220px',
    width: '220px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px lightgray',
    borderRadius: '20px',
    position: 'relative',
    backgroundColor: 'white',
    padding: '4px',
    boxSizing: 'border-box',
    [`@media (${mobile})`]: {
      height: '260px',
      width: '260px',
    },
  },
  cardHeader: {
    backgroundColor: colors.primary,
    color: 'white',
    font: '700 32px Lato',
    padding: '12px 20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    display: 'flex',
    gap: '24px',
    padding: '24px',
    position: 'relative',
    [`@media (${mobile})`]: {
      flexDirection: 'column',
    },
  },
  separator: {
    width: '1px',
    backgroundColor: 'lightgray',
    [`@media (${mobile})`]: {
      height: '1px',
      width: 'unset',
    },
  },
  sound: {
    cursor: 'pointer',
    display: 'flex',
    svg: { viewBox: '0 0 32 32', width: '32px', height: '32px' },
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    [`@media (${mobile})`]: {
      width: '260px',
      alignSelf: 'center',
    },
  },
  select: {
    font: '500 16px Lato',
    borderRadius: '20px',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
  },
  id: {
    font: '700 24px Lato',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    font: '500 16px Lato',
    [`@media (${mobile})`]: {
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  specials: {
    display: 'flex',
    flexDirection: 'column',
    font: '700 24px Lato',
    textAlign: 'right',
    position: 'absolute',
    top: '16px',
    right: '16px',
    span: commonStyles.rainbowText,
    [`@media (${mobile})`]: {
      position: 'unset',
      flexDirection: 'row',
      gap: '12px',
      justifyContent: 'center',
    },
  },
};

export default PokemonPage;
