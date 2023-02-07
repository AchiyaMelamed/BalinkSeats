import { useMemo } from "react";
import { useAppSelector } from "../../../store/features/store";

const PermissionComponent = ({
  showError,
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
    if (levelPermitted) {
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
      <h1>You don't have permissions for it.</h1>
    </div>
  ) : null;
};

export default PermissionComponent;
