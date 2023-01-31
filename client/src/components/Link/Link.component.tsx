import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkMui } from "@mui/material";

const LinkComponent = ({
  to,
  onClickLink,
  linkStyle,
  linkMuiStyle,
  children,
}: any) => {
  return (
    <Link
      to={to}
      onClick={onClickLink}
      style={{ textDecoration: "none", ...linkStyle }}
    >
      <LinkMui
        component="span"
        sx={{
          color: "#a57ce1 !important",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          ...linkMuiStyle,
        }}
      >
        {children}
      </LinkMui>
    </Link>
  );
};

export default LinkComponent;
