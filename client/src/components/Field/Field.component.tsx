import "./Field.scss";

import { InputLabel, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";

const FieldComponent = ({
  name,
  type,
  label,
  marginField,
  inputLabelStyle,
  inputColor,
  placeHolder,
  options,
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

  const selectInput = useMemo(() => {
    if (type === "select") {
      return (
        <div className="select-wrapper">
          {options.map((option: any) => (
            <div className="select-input" key={option.value}>
              <input
                type="checkbox"
                name={name}
                value={option.value}
                onChange={onChange}
                required={required}
                className="checkbox-input"
              />
              <label htmlFor={name} className="label-input">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
      // <select
      //   multiple={true}
      //   name={name}
      //   value={value}
      //   onChange={onChange}
      //   required={required}
      //   className="select-input"
      // >
      //   {options?.map((option: any) => (
      //     <option
      //       key={option.value}
      //       value={option.value}
      //       className="option-input"
      //     >
      //       {option.label}
      //     </option>
      //   ))}
      // </select>
    } else {
      return null;
    }
  }, [name, type, onChange, required, options]);

  return (
    <div
      style={{
        margin: marginField || "1rem 0 2rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      id={name}
    >
      <InputLabel
        sx={{
          fontWeight: 540,
          color: "unset",
          ...inputLabelStyle,
        }}
        htmlFor={name}
      >
        {label}
      </InputLabel>
      {selectInput ? (
        selectInput
      ) : (
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
            input: { color: inputColor || "#9073c0 !important" },
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
      )}
    </div>
  );
};

export default FieldComponent;
