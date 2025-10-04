import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Login";


export const Home = () => {

  return (
    <section className="hero">
      <h1><span className="highlight"><span className="opti">Opti</span><span className="prompt">Prompt</span></span></h1>
      <p className="tagline"><span className="prompt">Better prompt,</span> <span className="opti">Better result</span></p>
      <div className="hero-buttons">
        <Link to="/login" className="btn primary">Get Started</Link>
        <Link to="/about" className="btn secondary">Learn More</Link>
      </div>
    </section>
  );
};
