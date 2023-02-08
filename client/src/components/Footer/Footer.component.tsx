import "./Footer.scss";

import { Link } from "@mui/material";
import { GrLinkedin } from "react-icons/gr";
import { SiGmail } from "react-icons/si";

const FooterComponent = () => {
  const icons = [
    {
      name: "Gmail",
      icon: <SiGmail fontSize="large" />,
      link: "mailto:achiyam@balink.net",
    },
    {
      name: "LinkedIn",
      icon: <GrLinkedin fontSize="large" />,
      link: "https://www.linkedin.com/in/achiya-melamed/",
    },
  ];
  return (
    <footer className="footer-wrapper">
      <div>© {new Date().getFullYear()} Achiya Melamed</div>
      <div className="social-icons">
        {icons.map((icon) => (
          <Link
            href={icon.link}
            sx={{ display: "flex", alignItems: "center" }}
            key={icon.name}
          >
            {icon.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default FooterComponent;
