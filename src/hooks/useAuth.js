import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  console.log("funct useAuth is running")
  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log("use layout is runnning")
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, [navigate]);

  useEffect(() => {
    console.log("use  effect is running")
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, [navigate]);

  return;
};

export default useAuth;