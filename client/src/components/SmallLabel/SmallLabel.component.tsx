import { Divider, Typography } from "@mui/material";
import LinkComponent from "../Link/Link.component";

const SmallLabelComponent = ({
  labelStyle,
  divStyle,
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
      {link && linkLabel && (
        <LinkComponent to={link} onClick={onClickLink}>
          {linkLabel}
        </LinkComponent>
      )}
    </Typography>
  );

  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        textAlign: "center",
        ...divStyle,
      }}
    >
      {isDivider ? (
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
      )}
    </div>
  );
};

export default SmallLabelComponent;
