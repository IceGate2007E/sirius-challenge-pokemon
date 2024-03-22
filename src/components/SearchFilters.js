import { ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { colors, commonStyles } from '../utils/Common';
import { formatFirstLetterUpper } from '../utils/Utils';
import ColorBox from './pokemonInfo/ColorBox';

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'shadow',
  'steel',
  'unknown',
  'water',
];

const COLORS = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'yellow',
  'white',
];

const SPECIAL = ['baby', 'legendary', 'mythical'];

function SearchFilters({ setFilters }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    types: [],
    color: '',
    weight: [0, 1000],
    special: '',
  });

  const handleInput = (field, value) => {
    let temp = { ...inputs };
    temp[field] = value;
    setInputs(temp);
  };

  const handleChangeMultiple = (event) => {
    const value = event.target.value;
    handleInput('types', typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeSelect = (event) => {
    const value = event.target.value;
    handleInput('color', value === 'all' ? '' : value);
  };

  const handleChangeSlider = (_event, newValue, activeThumb) => {
    const minDistance = 5;
    const maxWeight = 1000;

    if (!Array.isArray(newValue)) {
      return;
    }

    let newSliderValue = newValue;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        newSliderValue = [
          Math.min(newValue[0], maxWeight - minDistance),
          newValue[0] + minDistance,
        ];
      } else {
        newSliderValue = [
          newValue[1] - minDistance,
          Math.max(newValue[1], minDistance),
        ];
      }
    }

    handleInput('weight', newSliderValue);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    handleInput('special', value === inputs.special ? '' : value);
  };

  const handleSearch = () => {
    let filters = [];
    if (inputs.name !== '')
      filters.push((item) => item.name.includes(inputs.name.toLowerCase()));
    if (inputs.types.length > 0)
      filters.push((item) =>
        inputs.types.every((type) => item.types.includes(type))
      );
    if (inputs.color !== '')
      filters.push((item) => item.color === inputs.color);
    if (inputs.special !== '')
      filters.push((item) => item.special === inputs.special);
    if (inputs.weight[0] === 0 && inputs.weight[1] < 1000)
      filters.push((item) => item.weight < 10 * inputs.weight[1]);
    if (inputs.weight[0] > 0 && inputs.weight[1] < 1000)
      filters.push(
        (item) =>
          item.weight < 10 * inputs.weight[1] &&
          item.weight > 10 * inputs.weight[0]
      );
    if (inputs.weight[0] > 0 && inputs.weight[1] === 1000)
      filters.push((item) => item.weight > 10 * inputs.weight[0]);

    setFilters(filters);
  };

  return (
    <Box display='flex' flexDirection='column'>
      <Button
        variant='contained'
        sx={commonStyles.button}
        onClick={() => setOpen(!open)}
        startIcon={open ? <ExpandLess /> : <ExpandMore />}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
      >
        Filters
      </Button>
      <Collapse in={open}>
        <Box sx={styles.filters}>
          <Box display='flex' gap='20px'>
            <TextField
              value={inputs.name}
              onChange={(e) => handleInput('name', e.target.value)}
              sx={commonStyles.textInput}
              InputProps={{ endAdornment: <Search /> }}
              placeholder='Name'
            />
            <FormControl size='small' sx={styles.formControl}>
              <InputLabel id='select'>Types</InputLabel>
              <Select
                label='Types'
                id='select'
                multiple
                value={inputs.types}
                onChange={handleChangeMultiple}
                size='small'
                MenuProps={{ PaperProps: { sx: commonStyles.menuItem } }}
                sx={styles.select}
              >
                {TYPES.map((type, index) => (
                  <MenuItem
                    disabled={
                      inputs.types.length === 2 &&
                      !inputs.types.find((a) => a === type)
                    }
                    value={type}
                    key={index}
                  >
                    {formatFirstLetterUpper(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' sx={styles.formControl}>
              <InputLabel id='color'>Color</InputLabel>
              <Select
                id='color'
                label='Color'
                value={inputs.color}
                onChange={handleChangeSelect}
                size='small'
                MenuProps={{ PaperProps: { sx: commonStyles.menuItem } }}
                sx={styles.select}
              >
                {['all', ...COLORS].map((color, index) => (
                  <MenuItem value={color} key={index}>
                    <Box display='flex' gap='10px'>
                      <ColorBox color={color} />
                      {formatFirstLetterUpper(color)}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display='flex' gap='20px'>
            <Box sx={styles.radioGroup}>
              <span>Special</span>
              <RadioGroup value={inputs.special} row={true}>
                {SPECIAL.map((special, index) => (
                  <FormControlLabel
                    value={special}
                    label={formatFirstLetterUpper(special)}
                    control={<Radio size='small' onClick={handleRadioChange} />}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </Box>
            <Box sx={styles.slider}>
              <span>Weight</span>
              <Slider
                value={inputs.weight}
                onChange={handleChangeSlider}
                valueLabelDisplay='auto'
                max={1000}
                step={5}
                disableSwap
                id='slider'
              />
            </Box>
          </Box>
          <Box width='200px'>
            <Button
              variant='contained'
              sx={commonStyles.button}
              onClick={() => handleSearch()}
              fullWidth
            >
              Search
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}

const styles = {
  filters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
    borderRadius: '20px',
    bgcolor: 'white',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  select: {
    backgroundColor: 'white',
    maxWidth: '200px',
    font: '500 16px Lato',
    borderRadius: '20px',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
  },
  formControl: {
    width: '200px',
    '& .MuiInputLabel-root': {
      font: '500 16px Lato',
      '&.Mui-focused': {
        color: colors.secondary,
      },
    },
  },
  radioGroup: {
    font: '500 16px Lato',
    textAlign: 'center',
    width: '300px',
    '& .MuiRadio-root.Mui-checked': { color: colors.primary },
    '& .MuiFormControlLabel-root': {
      height: '30px',
    },
    '& .MuiFormControlLabel-label': {
      font: '300 14px Lato',
    },
  },
  slider: {
    font: '500 16px Lato',
    textAlign: 'center',
    width: '240px',
    '& .MuiSlider-root': {
      color: colors.primary,
      '& .MuiSlider-thumb': {
        backgroundColor: colors.primary,
      },
      '& .MuiSlider-valueLabel': {
        backgroundColor: colors.secondary,
        borderRadius: '8px',
      },
    },
  },
};

export default SearchFilters;
