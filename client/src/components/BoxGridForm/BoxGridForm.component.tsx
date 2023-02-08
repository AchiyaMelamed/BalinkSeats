import { Box, Grid, Typography } from "@mui/material";

const FormWrapper = ({
  titleLabel,
  titleOnHover,
  boxStyle,
  gridStyle,
  titleStyle,
  children,
}: any) => {
  return (
    <Box
      component="div"
      title={titleOnHover && titleLabel}
      sx={{
        border: 1,
        // borderColor: "#A57CE1",
        marginTop: "3vh",
        width: "20vw",
        minWidth: "350px",
        borderRadius: 1,
        padding: "1rem",
        ...boxStyle,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{
          padding: "1rem 2rem",
          overflowY: "auto",
          alignItems: "center",
          ...gridStyle,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "#A57CE1 !important",
            fontWeight: 400,
            alignSelf: "center",
            marginBottom: 2,
            ...titleStyle,
          }}
        >
          {!titleOnHover && titleLabel}
        </Typography>
        {children}
      </Grid>
    </Box>
  );
};

export default FormWrapper;
