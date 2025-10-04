import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL, nameOfUser } from "./Login";


export const Main = ({ user, onLogout }) => {
  const [prompt, setPrompt] = useState("");
  const [optimized, setOptimized] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const logoutUser = useMutation({

    mutationFn: async() => {

      const request = await axios.delete(`${baseURL}auth/logout`, {

        withCredentials: true,
      });
      
      return request.data;
    },

    onSuccess: (data) => {

      queryClient.clear();

      navigate("/home");
    }
  });

  const optimizePrompt = useMutation({

    mutationFn: async({userPrompt}) => {

      const request = await axios.post(`${baseURL}optimize/`, {

        user_prompt: userPrompt
      },{

        withCredentials: true,
        headers: {

          "Content-Type": "application/json"
        }
      });

      return request.data;

    },

    onSuccess: (data) => {

      setOptimized(data.optimize_prompt);
      console.log(data)
    }
  });

  const handleLogout = () => {
    logoutUser.mutate();
  };

  const handleOptimize = async () => {

    optimizePrompt.mutate({userPrompt: prompt});
  };

  return (
    <section className="main">
      <h2>Welcome {nameOfUser}!</h2>
      <button className="btn logout" onClick={handleLogout}>
        { logoutUser.isPending? 'Logging out...': 'Log Out' }
      </button>

      <div className="prompt-box">
        <textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn primary" onClick={handleOptimize}>
          {optimizePrompt.isPending ? "Optimizing..." : "Optimize"}
        </button>
      </div>

      <div className="optimized-box">
        <h3>Optimized Prompt:</h3>
        <p>{optimized}</p>
      </div>
    </section>
  );
};
