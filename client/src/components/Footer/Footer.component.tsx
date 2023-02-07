import "./Footer.scss";

import { Link } from "@mui/material";
import { GrLinkedin } from "react-icons/gr";
import { SiGmail } from "react-icons/si";

import React from "react";

const FooterComponent = () => {
  return (
    <footer className="footer-wrapper">
      <div>© {new Date().getFullYear()} Achiya Melamed</div>
      <div className="social-icons">
        <Link href="mailto:youremail@example.com">
          <SiGmail fontSize="large" />
        </Link>
        <Link href="https://www.linkedin.com/in/achiya-melamed/">
          <GrLinkedin fontSize="large" />
        </Link>
      </div>
    </footer>
  );
};

export default FooterComponent;
