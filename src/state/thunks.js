import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLogout } from "./authSlice"; // Import the setLogout action

// Async action to handle logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (token, { dispatch }) => {
  try {
    const response = await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Additional error handling, if needed
      throw new Error("Failed to log out");
    }

    // Dispatch the setLogout action to update Redux state
    dispatch(setLogout());

    // Return response data if needed
    return response.json();
  } catch (error) {
    // Handle other errors, log them, etc.
    console.error("Error during logout:", error);
    throw error; // Re-throw the error for further handling
  }
});
