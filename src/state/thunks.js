import { createAsyncThunk } from "@reduxjs/toolkit";

// Async action to handle logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (token) => {
  const response = await fetch("http://localhost:8000/api/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }

  return response.json();
});
