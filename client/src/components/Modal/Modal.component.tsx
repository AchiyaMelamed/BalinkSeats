import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

const ModalComponent = ({
  open,
  modalStyle,
  onClose,
  title,
  children,
}: any) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minHeight: "15%",
          minWidth: "30%",
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
          alignSelf: "start",
        }}
      >
        close
      </IconButton>
      <DialogTitle
        sx={{
          padding: "0.5rem 0 1rem",
          color: "#5e2f7b !important",
          fontWeight: "600",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
