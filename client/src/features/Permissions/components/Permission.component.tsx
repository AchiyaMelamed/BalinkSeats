import { useMemo } from "react";
import { useAppSelector } from "../../../store/features/store";

import SmallLabelComponent from "../../../components/SmallLabel/SmallLabel.component";

const PermissionComponent = ({
  showError,
  errorLabel,
  showInstead,
  levelPermitted,
  emailPermitted,
  children,
}: any) => {
  const [signedUser, isSigned] = useAppSelector((state: any) => [
    state.signed.signedUser,
    state.signed.isSigned,
  ]);

  const isPermitted = useMemo(() => {
    if (levelPermitted && typeof levelPermitted === "object") {
      if (isSigned && levelPermitted.includes(signedUser?.level)) {
        return true;
      }
    } else if (levelPermitted && typeof levelPermitted === "string") {
      if (isSigned && signedUser?.level === levelPermitted) {
        return true;
      } else if (emailPermitted) {
        if (isSigned && signedUser?.email === emailPermitted) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }, [isSigned, signedUser, levelPermitted, emailPermitted]);

  return isPermitted ? (
    children
  ) : showInstead ? (
    <div>{showInstead}</div>
  ) : showError ? (
    <div className="no-permission">
      <SmallLabelComponent errorText>
        {errorLabel || "You don't have permissions for it."}
      </SmallLabelComponent>
    </div>
  ) : null;
};

export default PermissionComponent;
