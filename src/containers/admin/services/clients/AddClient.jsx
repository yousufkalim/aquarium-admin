import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Grid, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';

import api from '../../../../api/index';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
        color: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});

// eslint-disable-next-line object-curly-newline
function AddClient({ open, setOpen, editing, getClients, client }) {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
  });

  useEffect(() => {
    if (client) {
      setValues(client);
    }
  }, [client]);

  const { first_name, last_name, phone_number, email } = values;
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
      await api('put', `/clients/${client._id}`, values);
      toast.success('Client edited successfully');
    } else {
      await api('post', '/clients', values);
      toast.success('Client created successfully');
    }
    handleClose();
    getClients();
  };
  const outlinedInputStyles = useOutlinedInputStyles();

  return (
    <div>
      <Dialog
        open={open}
        setOpen={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="addAdminModal"
        style={{ borderRadius: '30px' }}
      >
        <div className="addAdminPopup" style={{ height: '100%' }}>
          <Grid container xs={12} sx={{ height: '100%' }}>
            <Grid xs={12}>
              <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
                {editing
                  ? 'Edit Technician Profile'
                  : 'Invite a new Technician'}
              </h1>
              <p className="clientPopupTxt">
                {editing
                  ? 'Client info will be modified by click on save button'
                  : 'Client will be added by phone number'}
              </p>
              <div className="hl-forget" />
              <Grid item xs={12}>
                <FormControl
                  sx={{ mb: 1, mt: 3, width: '85%' }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    label="First Name"
                    size="normal"
                    name="first_name"
                    value={first_name}
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
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ mb: 1, mt: 1, width: '85%' }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="outlined-email"
                    classes={outlinedInputStyles}
                    label="Last Name"
                    name="last_name"
                    value={last_name}
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
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  sx={{ mb: 1, mt: 1, width: '85%' }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="outlined-password"
                    classes={outlinedInputStyles}
                    label="Phone Number"
                    size="normal"
                    type="text"
                    value={phone_number}
                    name="phone_number"
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
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ mb: 1, mt: 1, width: '85%' }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="outlined-password"
                    classes={outlinedInputStyles}
                    label="Email"
                    size="normal"
                    type="email"
                    value={email}
                    name="email"
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
              </Grid>

              <Grid item xs={12}>
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
                  {editing ? 'Save' : 'Send Invite'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

export default AddClient;
