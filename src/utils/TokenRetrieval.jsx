// TokenRetrieval.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

const TokenRetrieval = {
  getToken: () => {
    try {
      // Retrieve the encrypted token from local storage
      const encryptedToken = localStorage.getItem("token");
      if (encryptedToken === null) {
        return null;
      }
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
    //   console.error("Error retrieving token:", error);
      return null;
    }
  },
};

export default TokenRetrieval;
