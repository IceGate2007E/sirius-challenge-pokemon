import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import MapObjectSelect from './MapObjectSelect';
import { formatGenTitle } from '../../utils/Utils';
import { commonStyles } from '../../utils/Common';
import Unknown from '../../assets/unknown-hd.png';

function SpriteGenSelects({ generations, setValue, style }) {
  const [genChosen, setGenChosen] = useState('');

  const handleGenChange = (e) => {
    setGenChosen(e.target.value);
    setValue(Unknown);
  };

  return (
    <>
      <FormControl size='small' fullWidth>
        <Select
          sx={style}
          value={genChosen}
          onChange={handleGenChange}
          fullWidth
          displayEmpty
          renderValue={(e) => (e ? formatGenTitle(e) : 'Choose')}
          MenuProps={{ PaperProps: { sx: commonStyles.menuItem } }}
        >
          {Object.entries(generations)
            .filter(([_, value]) => {
              return Object.values(value).some((v) =>
                Object.values(v).some((childValue) => childValue !== null)
              );
            })
            .map(([key, _]) => key)
            .map((key) => (
              <MenuItem key={key} value={key}>
                {formatGenTitle(key)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {genChosen && (
        <MapObjectSelect
          key={genChosen}
          object={generations[genChosen]}
          {...{ setValue, style }}
        />
      )}
    </>
  );
}

export default SpriteGenSelects;
