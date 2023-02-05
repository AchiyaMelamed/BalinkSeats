import "./Form.scss";

import { Button } from "@mui/material";
import FieldComponent from "../Field";
import LoadingComponent from "../Loading/Loading.component";
import { useMemo } from "react";

const FormComponent = ({
  fields,
  errorComponent,
  showError,
  requestStatus,
  bottomLineBeforeStyle,
  bottomLineAfterStyle,
  bottomLineHoverStyle,
  fieldsDivStyle,
  inputLabelStyle,
  submitButtonStyle,
  submitButtonHoverStyle,
  submitButtonLabel,
  onSubmitHandler,
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
            inputLabelStyle={inputLabelStyle}
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

  const finalSubmitButtonLabel = useMemo(
    () =>
      requestStatus === "pending" ? <LoadingComponent /> : submitButtonLabel,
    [requestStatus, submitButtonLabel]
  );

  return (
    <form onSubmit={onSubmitHandler}>
      {renderedFields}
      {showError && errorComponent}
      <Button
        type="submit"
        sx={{
          background: requestStatus === "pending" ? "#e6e6e6" : "#9073c0",
          color: requestStatus === "pending" ? "#9073c0" : "#e6e6e6",
          width: "100%",
          minHeight: "2.40625rem",
          alignSelf: "center",
          border: "1px solid",
          borderColor: requestStatus === "pending" ? "#9073c0" : "#e6e6e6",
          ":hover": {
            background: "#e6e6e6",
            color: "#9073c0 !important",
            border: "1px solid #9073c0",
            ...submitButtonHoverStyle,
          },
          ...submitButtonStyle,
        }}
      >
        {finalSubmitButtonLabel}
      </Button>
    </form>
  );
};

export default FormComponent;
