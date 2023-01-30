import "./Field.scss";

import { InputLabel, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../store/features/store";

const FieldComponent = ({
  name,
  type,
  label,
  placeHolder,
  value,
  onChange,
  width,
  required,
  bottomLineBeforeStyle,
  bottomLineAfterStyle,
  bottomLineHoverStyle,
}: any) => {
  useEffect(() => {
    const fieldElement = document.getElementById(name);
    if (fieldElement && width) {
      fieldElement.style.width = width;
    }
  }, [name, width]);

  return (
    <div className="field-wrapper" id={name}>
      <InputLabel sx={{ fontWeight: 540 }} htmlFor={name}>
        {label}
      </InputLabel>
      <TextField
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        required={required}
        variant="standard"
        size="small"
        sx={{
          width: "100%",
          "& .MuiInput-underline:before": {
            borderBottomColor: "#e6e6e6",
            ...bottomLineBeforeStyle,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#9073c0",
            ...bottomLineAfterStyle,
          },
          ":hover": {
            "& .MuiInput-underline:before": {
              borderBottomColor: "white",
              ...bottomLineHoverStyle,
            },
          },
        }}
      />
    </div>
  );
};

export default FieldComponent;
