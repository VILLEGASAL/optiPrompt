import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "./Login";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = useMutation({

    mutationFn: async({username, password}) => {

      const request = await axios.post(`${baseURL}auth/signup/`, {

        username: username,
        password: password
      }, {
        withCredentials: true,
        headers: {"Content-Type": "application/json"}
      });

      return request.status;
    },

    onSuccess: (data) => {

      console.log("Successfully Registered");
      
      navigate("/login")
    }
  });

  const handleRegister = async (e) => {
    
    registerUser.mutate({username: username, password: password});
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Username"
          onChange={(event) => { setUsername(event.target.value) }}
          value={username} />
          

        <input 
          type="password" 
          placeholder="Password"
          onChange={(event) => { setPassword(event.target.value) }}
          value={password} />

        <button onClick={handleRegister} disabled={registerUser.isPending}>
          { registerUser.isPending ? "Loading..." : "Register" }
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
