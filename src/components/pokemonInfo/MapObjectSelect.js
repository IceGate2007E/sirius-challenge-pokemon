import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import { formatFirstLetterUpper } from '../../utils/Utils';
import { colors, commonStyles } from '../../utils/Common';

function MapObjectSelect({ object, setValue, style }) {
  const [option, setOption] = useState('');
  const [keySelected, setKeySelected] = useState('Choose');

  const handleSelect = (event) => {
    const selected = event.target.value;
    setOption(selected);
    setValue(selected);
  };
  const handleKey = (key) => {
    setKeySelected(formatFirstLetterUpper(key));
  };

  const labelStyle = {
    font: style.font,
    '&.Mui-focused': {
      color: colors.secondary,
    },
  };

  return (
    <FormControl size='small' fullWidth>
      <InputLabel id='select' sx={labelStyle}>
        {keySelected}
      </InputLabel>
      <Select
        id='select'
        sx={style}
        value={option}
        label={keySelected}
        onChange={handleSelect}
        fullWidth
        MenuProps={{ PaperProps: { sx: commonStyles.menuItem } }}
      >
        {Object.entries(object)
          .filter(([_, value]) => Object.values(value).some((v) => v !== null))
          .map(([key, value]) => [
            <ListSubheader key={key}>
              {formatFirstLetterUpper(key)}
            </ListSubheader>,
            ...Object.entries(value)
              .filter(([_, v]) => v && typeof v !== 'object')
              .map(([k, v]) => (
                <MenuItem key={k} value={v} onClick={() => handleKey(key)}>
                  {formatFirstLetterUpper(k)}
                </MenuItem>
              )),
          ])}
      </Select>
    </FormControl>
  );
}

export default MapObjectSelect;
