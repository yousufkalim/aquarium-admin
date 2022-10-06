import { Grid, OutlinedInput, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../assets/images/loginLogo.svg';
// import Footer from '../components/Footer';

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
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #CDEEFC ',
      borderRadius: '20px',
      fontSize: 16,
      width: 'auto',
    },
  },
});

export default function Login() {
  const outlinedInputStyles = useOutlinedInputStyles();
  return (
    <div className="loginPg">
      <Grid item xs={0} className="loginFirstSection">
        <img src={Logo} className="logoLogin" alt="" />
      </Grid>

      <Grid container className="loginFormSection" xs={12}>
        <Grid xs={0} xl={4.5} lg={4.2} />
        <Grid className="lgForm" xs={12} xl={3} lg={3.5}>
          <h1 className="signInTxt">Sign in to Aquarium!</h1>
          <Grid item xs={12}>
            <FormControl sx={{ mb: 3, mt: 4, width: '100%' }} variant="outlined">
              <TextField
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Email"
                size="normal"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                className="passwordField"
                classes={outlinedInputStyles}
                // type={values.showPassword ? 'text' : 'password'}
                // value={values.password}
                // onChange={handleChange('password')}
                endAdornment={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      // onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {false ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <p className="forgetPasswordTxt">Forget password</p>
            </FormControl>
          </Grid>
          <Grid>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button className="signInBtn" variant="contained">
                Sign in
              </Button>
            </Link>
          </Grid>
        </Grid>
        {/* <CssTextField /> */}
      </Grid>
      {/* {window.innerWidth < 992 ? <Footer /> : ''} */}
    </div>
  );
}
