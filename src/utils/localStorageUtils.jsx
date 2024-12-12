// src/utils/localStorageUtils.js
const LocalStorageUtils = {
  save(key, data) {

    // Recursive filtering to deeply remove file-like objects
    const deepFilter = (obj) => {
      if (Array.isArray(obj)) {
        // Filter out arrays containing file-like objects
        return obj
          .filter(item => !isFileLike(item)) // Exclude file-like objects
          .map(deepFilter); // Recursively process nested arrays
      } else if (obj && typeof obj === "object") {
        // Recursively filter nested objects
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([_, value]) => !isFileLike(value)) // Exclude file-like values
            .map(([key, value]) => [key, deepFilter(value)])
        );
      }
      return obj; // Return non-object or non-file-like values as is
    };

    // Helper function to detect file-like objects
    const isFileLike = (value) => {
      if (value instanceof File) return true; // Check for actual File instances
      if (value && typeof value === "object" && value.name && value.id) {
        return true; // Exclude file-like objects
      }
      return false;
    };

    const filteredData = deepFilter(data);

    localStorage.setItem(key, JSON.stringify(filteredData));
  },

  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  clear(key) {
    localStorage.removeItem(key);
  },
};

export default LocalStorageUtils;
