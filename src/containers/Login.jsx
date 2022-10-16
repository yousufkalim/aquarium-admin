import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Logo from '../assets/images/loginLogo.svg';
import ForgetPasswordPopup from '../components/ForgetPasswordPopup';
import api from '../api';
import { UpdateStore } from '../StoreContext';

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
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const updateStore = UpdateStore();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { data } = await api('post', '/admins/login', user);

    updateStore({ admin: data.admin, loggedIn: true });
    localStorage.setItem('token', data.token);

    window.location = `/${data.admin?.role}`;
  };

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
            <FormControl
              sx={{ mb: 3, mt: 4, width: '100%' }}
              variant="outlined"
            >
              <TextField
                sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Email"
                size="normal"
                name="email"
                value={user.email}
                onChange={handleChange}
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
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(true)}
                        onMouseDown={() => setShowPassword(true)}
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
            <Button
              className="signInBtn"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
        {/* <CssTextField /> */}
      </Grid>

      {open && <ForgetPasswordPopup open={open} setOpen={setOpen} />}
    </div>
  );
}
