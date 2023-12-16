const BASE_URL = 'http://127.0.0.1:8000';

// Function to get the CSRF token from cookies
const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : '';
};

// Function to get the authentication token from local storage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to set the authentication token to local storage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getAuthToken()}`, // Include the authentication token
      },
      body: JSON.stringify(userData),
    });

    // Handle the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    // Log the entire response object for inspection
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    // Handle the response
    const responseText = await response.text(); // Get the response text


    console.log('Response text:', responseText); // Log the response text

    if (!response.ok) {
      const errorData = responseText ? JSON.parse(responseText) : {};
      throw new Error(errorData.message || 'Login failed');
    }

    // Parse JSON once to get the data
    const responseData = responseText ? JSON.parse(responseText) : {};

    // Store the authentication token in local storage
    setAuthToken(responseData.token);

    return responseData;  // Return the parsed response data
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forgot-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Forgot password request failed');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error during forgot password:', error.message);
    throw error;
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    const csrfToken = getCsrfToken(); // Get CSRF token from your function or context

    const response = await fetch(`${BASE_URL}/api/reset-password/${token}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
      },
      body: JSON.stringify({ new_password: newPassword }),
    });

    // ... rest of the code
  } catch (error) {
    console.error('Error during password reset:', error.message);
    throw error;
  }
};


export { registerUser, loginUser, forgotPassword, resetPassword };

