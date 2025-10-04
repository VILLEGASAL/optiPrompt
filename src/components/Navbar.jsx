import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on /main
  if (location.pathname === "/main") return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="opti">
            Opti
          </span>

          <span className="prompt">
            Prompt  
          </span>
          
        </div>

        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li><Link to="/home" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};
