import { Grid } from "@mui/material";
import { BALINK_LOGO_NO_BG } from "../../../assets";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      sx={{ p: 2 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img src={BALINK_LOGO_NO_BG} alt="balink-logo" width="200em" />
      <main>{children}</main>
    </Grid>
  );
}

export default AuthLayout;
