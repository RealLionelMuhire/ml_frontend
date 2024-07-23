// TokenRetrieval.jsx

const TokenRetrieval = {
  getToken: () => {
    try {
      // Retrieve token from local storage
      const savedToken = localStorage.getItem("token");
      if (savedToken === null) {
        return null;
      }
      return savedToken;
    } catch (error) {
    //   console.error("Error retrieving token:", error);
      return null;
    }
  },
};

export default TokenRetrieval;
