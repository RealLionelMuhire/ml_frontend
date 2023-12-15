import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, forgotPassword } from '../../../services/api';
import { loginAction } from '../../../actions/authActions';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'; // Change the import name here
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://mlcorporateservices.com//">
        ML Corporate Services
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AdminLoginPage({ isAuthenticated, loginAction }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please provide both username/email and password.');
      return;
    }

    setError('');

    try {
      console.log('Logging in ...');
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log('Backend response:', response);

      if (response.token) {
        loginAction(response.user_id);

        if (!isAuthenticated) {
          navigate('/admin-dashboard');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      navigate('/admin-login', {
        state: { errorMessage: 'Login failed. Please try again.' },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            marginX: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            backgroundColor: 'transparent', // Set background to transparent
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h6" sx={{ color: '00008B' }}>
            Login (For ML Staffs Only!)
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Log in
            </Button>
            {error && <p className="error-message">{error}</p>}
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forget-password" variant="body2">
                  Forgot password?
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <p
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            color: '#61dafb', // Set color to the desired color
            fontSize: '0.9rem', // Set font size as needed
          }}
        >
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </p>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (user) => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage);

