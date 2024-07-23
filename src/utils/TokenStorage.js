import { jwtDecode } from "jwt-decode";

const TokenStorage = {
  saveAccessToken(token) {
    localStorage.setItem("access_token", token);
  },

  saveRefreshToken(token) {
    localStorage.setItem("refresh_token", token);
  },

  getAccessToken() {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return null;
      }
      return token;
    } catch (error) {
      console.error("Invalid access token", error);
      return null;
    }
  },

  getRefreshToken() {
    const token = localStorage.getItem("refresh_token");
    return token;
  },

  clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export default TokenStorage;
