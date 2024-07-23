// utils/TokenService.js
import TokenStorage from "./TokenStorage";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const TokenService = {
  async refreshAccessToken() {
    const refreshToken = TokenStorage.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${baseUrl}token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      TokenStorage.saveAccessToken(data.access);
      return data.access;
    } catch (error) {
      TokenStorage.clearTokens();
      return null;
    }
  },
};

export default TokenService;
