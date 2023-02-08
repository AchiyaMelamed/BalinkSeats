import "./Footer.scss";

import { GrLinkedin } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import Link from "@mui/material/Link";

const FooterComponent = () => {
  const icons = [
    {
      name: "Gmail",
      icon: <SiGmail {...{ title: "achiyam@balink.net" }} fontSize="large" />,
      link: "mailto:achiyam@balink.net",
      title: "achiyam@balink.net",
    },
    {
      name: "LinkedIn",
      icon: <GrLinkedin fontSize="large" />,
      link: "https://www.linkedin.com/in/achiya-melamed/",
      title: "Achiya Melamed",
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
            target="_blank"
            title={icon.title}
          >
            {icon.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default FooterComponent;
