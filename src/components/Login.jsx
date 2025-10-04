import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"

export const baseURL = "https://prompt-jbjr.onrender.com/" 

export let nameOfUser = "";

export const Login = () => {
  const [username, setUsername] = useState("");
  
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginUser = useMutation({

    mutationFn: async({username, password}) => {

      const request = await axios.post(`${baseURL}auth/login/`, {

        username: username,
        password: password
      },
      {
        withCredentials: true,
        headers:{"Content-Type": "application/json"},
      });

      return request.data;
    },
    onSuccess: (data) => {

      nameOfUser = data.username;
      
      console.log(nameOfUser);

      queryClient.invalidateQueries({ queryKey: ["session"] }); 

      navigate("/");
    },

    onError: (error) => {

      const msg = error?.response?.data?.message || "Login Failed";

      setErrorMessage(msg);

      setTimeout(() => {

        setErrorMessage("");
      }, 3000);
    }

  });

  const handleLogin = async (e) => {
    
    loginUser.mutate({username: username, password: password});
  };

  const handleUsername = (event) => {

    setUsername(event.target.value);
  }

  const handlePassword = (event) => {

    setPassword(event.target.value);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        {
          errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
          )
        }

        <input 
          type="text" 
          placeholder="Username" 
          onChange={handleUsername}
          value={username}/>

        <input 
          type="password" 
          placeholder="Password"
          onChange={handlePassword} 
          value={password}/>
        
        <button onClick={handleLogin} disabled={loginUser.isPending}>
            {loginUser.isPending ? "Logging in...": "Login"}
        </button>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
