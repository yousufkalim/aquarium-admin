import React from 'react';
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

function ForgetPasswordPopup({ open, setOpen }) {
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
        style={{ backdropFilter: 'blur(20px)', borderRadius: '30px' }}
      >
        <div className="forgetPasswordPopup">
          <Grid container xs={12}>
            <Grid xs={12}>
              <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>Forgot Password</h1>
              <p className="enterEmailTxt">
                Enter your email, So we can send you reset instructions
              </p>
              <div className="hl-forget" />
              <Grid item xs={12}>
                <FormControl sx={{ mb: 3, mt: 6, width: '85%' }} variant="outlined">
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
                  {window.innerWidth < 768 ? 'Reset' : ' Send Reset Instructions'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

export default ForgetPasswordPopup;
