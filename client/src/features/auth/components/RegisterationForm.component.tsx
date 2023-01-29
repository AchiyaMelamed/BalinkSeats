import "./RegistrationForm.scss";
import { Box, Grid, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import { FC, FormEvent, useState } from "react";
import FieldComponent from "../../../components/Field.component";

const RegistrationFormComponent: FC = () => {
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeHolder: "example@balink.net",
    },
    { name: "password1", label: "Password", type: "password" },
    { name: "password2", label: "Password Again", type: "password" },
  ];
  const renderedFields = fields.map((field) => (
    <FieldComponent
      key={field.name}
      name={field.name}
      type={field.type}
      label={field.label}
      placeHolder={field.placeHolder}
    />
  ));

  return (
    <Box
      sx={{
        border: 1,
        padding: 1,
        borderColor: "#A57CE1",
        marginTop: 5,
        width: "20rem",
        borderRadius: 5,
      }}
    >
      <form action="">
        <Grid container direction="column" justifyContent="flex-start">
          <Typography
            variant="h5"
            component="h1"
            sx={{
              color: "#3D2C8D",
              fontWeight: 500,
              alignSelf: "center",
              padding: 2,
            }}
          >
            Register to BalinkSeats
          </Typography>
          <div className="form-fields">{renderedFields}</div>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistrationFormComponent;
