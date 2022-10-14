import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../assets/images/loginLogo.svg';
import ForgetPasswordPopup from '../components/ForgetPasswordPopup';

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

export default function Login() {
  const [open, setOpen] = useState(false);

  const outlinedInputStyles = useOutlinedInputStyles();
  return (
    <div className="loginPg">
      <Grid item xs={0} className="loginFirstSection">
        <img src={Logo} className="logoLogin" alt="" />
        <Link to="/">
          <ClearIcon className="loginClearIcon" />
        </Link>
      </Grid>

      <Grid container className="loginFormSection" xs={12}>
        <Grid xs={0} xl={4.5} lg={4.2} />
        <Grid className="lgForm" xs={12} xl={3} lg={3.5}>
          <h1 className="signInTxt">Sign in to Aquarium!</h1>
          <Grid item xs={12}>
            <FormControl sx={{ mb: 3, mt: 4, width: '100%' }} variant="outlined">
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
            <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
              <TextField
                sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                id="outlined-password"
                classes={outlinedInputStyles}
                label="Password"
                size="normal"
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
                // type={values.showPassword ? 'text' : 'password'}
                // value={values.password}
                // onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {true ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <p
                className="forgetPasswordTxt"
                onClick={() => setOpen(true)}
                onKeyDown={() => setOpen(true)}
                role="presentation"
                aria-hidden
              >
                Forget password
              </p>
            </FormControl>
          </Grid>
          <Grid>
            <Link to="/superadmin" style={{ textDecoration: 'none' }}>
              <Button className="signInBtn" variant="contained">
                Sign in
              </Button>
            </Link>
          </Grid>
        </Grid>
        {/* <CssTextField /> */}
      </Grid>

      {open && <ForgetPasswordPopup open={open} setOpen={setOpen} />}
    </div>
  );
}
