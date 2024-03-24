import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Authenticate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(false);
    if (token && token !== "undefined") {
      setIsAuthenticated(true);
      // Fetch user information using the token and update the user state
      // Example:
      // fetchUserInfo(token).then((userData) => setUser(userData));
      const response = {
        message: "Login successful",
        user_id: "user_data['UserID']",
        token: "token.key",
        first_name: "user_data['FirstName']",
        last_name: "user_data['LastName']",
      };

      // Extract user data from the response
      const { user_id, first_name, last_name } = response;
      setUser({
        id: user_id,
        firstName: first_name,
        lastName: last_name,
        // Add any other relevant user information here
      });
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return children({ isAuthenticated, user });
};

export default Authenticate;