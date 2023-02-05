import "./Modal.scss";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

const ModalComponent = ({
  open,
  modalStyle,
  titleStyle,
  onClose,
  title,
  secondModal,
  children,
}: any) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          alignItems: "center",
          justifyContent: "center",
          ...modalStyle,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          width: "fit-content",
          color: "#212121 !important",
          fontSize: "1rem",
          justifySelf: "start",
          alignSelf: "start",
        }}
      >
        close
      </IconButton>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <DialogTitle
            sx={{
              padding: "0.5rem 0 1rem",
              color: "#5e2f7b !important",
              fontWeight: "600",
              ...titleStyle,
            }}
          >
            {title}
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
        </div>
        {secondModal && (
          <div className="second-modal-wrapper">{secondModal}</div>
        )}
      </div>
    </Dialog>
  );
};

export default ModalComponent;
