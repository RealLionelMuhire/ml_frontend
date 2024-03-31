// TokenStorage.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

const TokenStorage = {
  saveToken: (token) => {
    try {
      // Encrypt the token before storing it
      const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
      localStorage.setItem("token", encryptedToken);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },
};

export default TokenStorage;
