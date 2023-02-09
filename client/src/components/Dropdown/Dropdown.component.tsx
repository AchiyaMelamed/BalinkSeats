import { useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";

const DropdownComponent = ({
  options,
  selected,
  handleSelect,
  getOptionLabel,
  isOptionEqualToValue,
  inputStyle,
}: any) => {
  return (
    <Autocomplete
      sx={{ width: "25vw", ...inputStyle }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an employee"
          margin="dense"
          sx={{
            input: { color: "#9073c0 !important", fontWeight: "600" },
          }}
        />
      )}
      renderOption={(props: any, option: any, state: object) => (
        <li {...props}>
          <span
            style={{
              color: "#A61F69",
            }}
          >
            {getOptionLabel(option)}
          </span>
        </li>
      )}
      ListboxProps={{
        style: { maxHeight: "12rem", backgroundColor: "#F5F5F5" },
      }}
      disablePortal
      options={options}
      defaultValue={selected || null}
      onChange={handleSelect}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
    />
  );
};

export default DropdownComponent;
