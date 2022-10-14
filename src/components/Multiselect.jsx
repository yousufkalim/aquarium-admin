/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import filter from '../assets/images/filter.png';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sizes = [
  '5 gallon',
  '15 gallon',
  '10 gallon',
  '25 gallon',
  '20 gallon',
  '35 gallon',
  '30 gallon',
  '45 gallon',
  '50 gallon',
];

function getStyles(name, tank, theme) {
  return {
    fontWeight:
      tank.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ text, style, sx }) {
  const theme = useTheme();
  const [tank, settank] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    settank(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={sx} size="small">
        <Select
          multiple
          displayEmpty
          value={tank}
          onChange={handleChange}
          input={<OutlinedInput />}
          style={style}
          IconComponent={() => (
            <>
              <KeyboardArrowDownOutlinedIcon />
              {text === 'Filter' ? <img src={filter} style={{ margin: '0 12%' }} alt="" /> : ''}
            </>
          )}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{text}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{text}</em>
          </MenuItem>
          {sizes.map((size) => (
            <MenuItem key={size} value={size} style={getStyles(size, tank, theme)}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
