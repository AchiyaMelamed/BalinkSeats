import { Box, Grid, Typography } from "@mui/material";

const FormWrapper = ({ titleLabel, children }: any) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#A57CE1",
        marginTop: 5,
        width: "20rem",
        borderRadius: 1,
        padding: "1rem",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{
          padding: "1rem 2rem",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "#3D2C8D",
            fontWeight: 400,
            alignSelf: "center",
            marginBottom: 2,
          }}
        >
          {titleLabel}
        </Typography>
        {children}
      </Grid>
    </Box>
  );
};

export default FormWrapper;
