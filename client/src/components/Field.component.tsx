import { InputLabel, TextField } from "@mui/material";

const FieldComponent = ({ name, type, label, placeHolder }: any) => {
  return (
    <>
      <InputLabel sx={{ fontWeight: 600, marginTop: 2 }} htmlFor={name}>
        {label}
      </InputLabel>
      <TextField
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        variant="standard"
        size="small"
        sx={{
          marginBottom: 2,
          "& .MuiInput-underline:before": { borderBottomColor: "#ffffff" },
          "& .MuiInput-underline:after": { borderBottomColor: "#674188" },
        }}
      />
    </>
  );
};

export default FieldComponent;
