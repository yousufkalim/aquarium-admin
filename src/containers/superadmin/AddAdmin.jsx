import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Grid, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

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

function AddAdmin({ open, setOpen }) {
  const [edit] = useState(false);

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        setOpen={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="addAdminModal"
        style={{ backdropFilter: 'blur(20px)', borderRadius: '30px' }}
      >
        <div className="addAdminPopup" style={{ height: '100%' }}>
          <Grid container xs={12} sx={{ height: '100%' }}>
            <Grid xs={12}>
              <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>Invite a new Admin</h1>
              <p className="enterEmailTxt">Admin will be invited by email address</p>
              <div className="hl-forget" />
              <Grid item xs={12}>
                <FormControl sx={{ mb: 1, mt: 6, width: '85%' }} variant="outlined">
                  <TextField
                    sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    label="First Name"
                    size="normal"
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
                <FormControl sx={{ mb: 1, mt: 1, width: '85%' }} variant="outlined">
                  <TextField
                    sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                    id="outlined-email"
                    classes={outlinedInputStyles}
                    label="Last Name"
                    size="lname"
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
                <FormControl sx={{ mb: 1, mt: 1, width: '85%' }} variant="outlined">
                  <TextField
                    sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                    id="outlined-email"
                    classes={outlinedInputStyles}
                    label="Email"
                    size="normal"
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
                <Button onClick={handleClose} className="closeBtn" variant="outlined">
                  Close
                </Button>
                <Button onClick={handleClose} className="resetPasswordBtn" variant="contained">
                  {edit ? 'Save' : 'Send Invite'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

export default AddAdmin;
