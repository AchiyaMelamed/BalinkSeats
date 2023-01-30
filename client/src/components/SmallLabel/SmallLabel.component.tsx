import { Divider, Link, Typography } from "@mui/material";

const SmallLabelComponent = ({
  labelStyle,
  linkLabel,
  link,
  onClickLink,
  linkStyle,
  isDivider,
  dividerStyle,
  children,
}: any) => {
  const label = (
    <Typography
      variant="body2"
      component={"small"}
      sx={{
        width: "fit-content",
        margin: "auto",
        padding: "0.5rem",
        ...labelStyle,
      }}
    >
      {children}{" "}
      <Link
        href={link}
        onClick={onClickLink}
        sx={{ color: "#a57ce1 !important", ...linkStyle }}
      >
        {linkLabel}
      </Link>
    </Typography>
  );
  return isDivider ? (
    <Divider
      sx={{
        "&::before, &::after": {
          borderColor: "#e6e6e6",
          ...dividerStyle,
        },
      }}
    >
      {label}
    </Divider>
  ) : (
    label
  );
};

export default SmallLabelComponent;
