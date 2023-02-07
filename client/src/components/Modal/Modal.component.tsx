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
          width: "70%",
          borderRadius: "0.5rem",
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
          height: "fit-content",
          maxHeight: "80vh",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: secondModal ? "50%" : "100%",
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
