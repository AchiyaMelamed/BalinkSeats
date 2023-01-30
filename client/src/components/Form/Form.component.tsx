import "./Form.scss";

import { Box, Button, Grid, Typography } from "@mui/material";
import FieldComponent from "../Field";

const FormComponent = ({
  fields,
  errorComponent,
  showError,
  bottomLineBeforeStyle,
  bottomLineAfterStyle,
  bottomLineHoverStyle,
  fieldsDivStyle,
  boxStyle,
  contentGridStyle,
  titleStyle,
  titleLabel,
  submitButtonStyle,
  submitButtonHoverStyle,
  submitButtonLabel,
  onSubmitHandler,
  children,
}: any) => {
  const renderedFields = (
    <div style={{ ...fieldsDivStyle }} className="form-fields-wrapper">
      {fields.map(
        (field: {
          name: string;
          type: string;
          label: string;
          placeHolder: string;
          value: string;
          onChange: (e: any) => void;
          width: string;
          required: boolean;
        }) => (
          <FieldComponent
            key={field.name}
            name={field.name}
            type={field.type}
            label={field.label}
            placeHolder={field.placeHolder}
            value={field.value}
            onChange={field.onChange}
            width={field.width}
            required={field.required}
            bottomLineBeforeStyle={bottomLineBeforeStyle}
            bottomLineAfterStyle={bottomLineAfterStyle}
            bottomLineHoverStyle={bottomLineHoverStyle}
          />
        )
      )}
    </div>
  );

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#A57CE1",
        marginTop: 5,
        width: "20rem",
        borderRadius: 1,
        padding: "1rem",
        ...boxStyle,
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          sx={{
            padding: "1rem 2rem",
            ...contentGridStyle,
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
              ...titleStyle,
            }}
          >
            {titleLabel}
          </Typography>
          {renderedFields}
          {showError && errorComponent}
          <Button
            type="submit"
            sx={{
              background: "#9073c0",
              width: "100%",
              alignSelf: "center",
              border: "1px solid #e6e6e6",
              ":hover": {
                background: "#e6e6e6",
                color: "#9073c0 !important",
                border: "1px solid #9073c0",
                ...submitButtonHoverStyle,
              },
              ...submitButtonStyle,
            }}
          >
            {submitButtonLabel || "Submit"}
          </Button>
        </Grid>
      </form>
      {children}
    </Box>
  );
};

export default FormComponent;
