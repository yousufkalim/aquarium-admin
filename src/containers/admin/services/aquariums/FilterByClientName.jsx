/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import filter from '../../../../assets/images/filter.png';

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

export default function MultipleSelect({ text, style, sx, clients }) {
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

              <img src={filter} style={{ margin: '0 2%' }} alt="" />
            </>
          )}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p>{text}</p>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{text}</em>
          </MenuItem>

          {clients?.map((client) => (
            <MenuItem value={client.first_name}>
              {`${client.first_name} ${client.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
