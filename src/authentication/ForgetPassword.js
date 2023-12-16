// ForgetPassword.js

import React, { useState } from 'react';
import { forgotPassword } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

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

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      console.log('Sending forget password request ...');
      const response = await forgotPassword(formData.email);
      console.log('Forget password response:', response);

      if (response.message) {
        setError(`Password reset email sent to ${formData.email}`);
      } else {
        setError('Forget password request failed. Please check your email address.');
      }
    } catch (error) {
      console.error('Forget password error:', error);
      setError('Forget password request failed. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add additional validation if needed
    handleForgotPassword();
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
            backgroundColor: 'transparent',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* You can use a relevant icon for the Avatar */}
          </Avatar>
          <Typography component="h1" variant="h6" sx={{ color: '00008B ' }}>
            Enter your registered email
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleForgotPassword}
            >
              Send Reset Email
            </Button>
            {error && <p className="error-message">{error}</p>}
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
};

export default ForgetPassword;


