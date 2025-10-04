import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import axios from "axios";

const baseURL = "https://prompt-jbjr.onrender.com/";

export const RequireGuest = ({ children }) => {
  const { data, isLoading } = useQuery({
    
    queryKey: ["session"],

    queryFn: async () => {
      try {

        const response = await axios.get(`${baseURL}auth/check_session/`, {
          withCredentials: true,
        });

        return response.data; 

      } catch (error) {
        if (error.response?.status === 401) {

          return null; 
        }

        throw error;
      }
    },
    retry: false,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    return <Navigate to="/" replace />;
  }

  return children;
};
