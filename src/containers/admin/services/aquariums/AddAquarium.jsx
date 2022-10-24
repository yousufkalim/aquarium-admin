/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import api from '../../../../api/index';

// eslint-disable-next-line object-curly-newline

// styling for dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

// styling for text field
const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});

// styling for select drop down
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  // 'label + &': {
  //   // marginTop: theme.spacing(3),
  //   color: 'red',
  // },

  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #CDEEFC',
    fontSize: 16,
    padding: '4% 10%',
    transition: theme.transitions.create([
      'border-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 20,
      borderColor: '#28CDFF',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
export default function AddAquarium({
  open,
  setOpen,
  editing,
  getAquariums,
  aquarium,
}) {
  const [values, setValues] = useState({
    address: {
      street: '',
      city: '',
      country: '',
      zip_code: '',
      lat: '',
      lng: '',
    },
    client: '',
    tank_details: {
      size: '',
      type: '',
      material: '',
      filter: '',
    },
    service_details: '',
  });

  useEffect(() => {
    if (aquarium) {
      setValues(aquarium);
    }
  }, [aquarium]);

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeEvent = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (editing) {
      await api('put', `/clients/aquairiums/${aquarium._id}`, values);
      toast.success('Client edited successfully');
    } else {
      await api('post', '/clients/aquariums', values);
      toast.success('Client created successfully');
    }
    handleClose();
    getAquariums();
  };
  const outlinedInputStyles = useOutlinedInputStyles();

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            borderRadius: 25,
            background: '#F3FDFF',
          },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
              {editing ? 'Edit Aquarium' : 'Add An Aquarium'}
            </h1>
            <p className="clientPopupTxt">
              {editing
                ? 'Aquarium will be modified in the list'
                : 'Aquarium will be added in the list'}
            </p>
            <div className="hl-forget" />

            <FormControl sx={{ mt: 5, mr: 5, mb: 3, width: '45%' }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: '#8C8C8C',
                  fontSize: '19px',
                  fontWeight: '700',
                }}
              >
                Client Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.client}
                placeholder="Client Name"
                label="Age"
                onChange={onChangeEvent}
                input={<BootstrapInput />}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ mb: 1, mt: 5, width: '45%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Address"
                name="address"
                // value={values.address}
                type="text"
                onChange={onChangeEvent}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ width: '95%', mb: 5 }}>
              <TextField
                multiline
                rows={5}
                maxRows={5}
                classes={outlinedInputStyles}
                label="Service Details"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <h1
              style={{
                fontSize: '24px',
                color: '#28CDFF',
                marginBottom: '2%',
              }}
            >
              Tank Details
            </h1>

            <div className="hl-forget" />
            <FormControl
              sx={{ mb: 2, mt: 5, width: '45%', mr: 5 }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: '#8C8C8C',
                  fontSize: '19px',
                  fontWeight: '700',
                }}
              >
                Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.size}
                label="Age"
                // onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, mt: 5, width: '45%' }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: '#8C8C8C',
                  fontSize: '19px',
                  fontWeight: '700',
                }}
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.type}
                label="Age"
                // onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ mb: 1, mt: 1, width: '45%', mr: 5 }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: '#8C8C8C',
                  fontSize: '19px',
                  fontWeight: '700',
                }}
              >
                Material
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.material}
                label="Age"
                // onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ mb: 1, mt: 1, width: '45%' }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: '#8C8C8C',
                  fontSize: '19px',
                  fontWeight: '700',
                }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.filter}
                label="Age"
                // onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="closeBtn"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className="resetPasswordBtn"
            variant="contained"
          >
            {editing ? 'Update Aquarium' : 'Add Aquarium'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
