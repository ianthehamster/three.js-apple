import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function ErrorPage({ errorMessage, handleErrorMessage }) {
  return (
    <Dialog open={!!errorMessage} onClose={handleErrorMessage}>
      <DialogTitle>Oops! Something went wrong!</DialogTitle>
      <DialogContent className="error-dialog-content">
        <p>{errorMessage}</p>
        <Button
          sx={{
            backgroundColor: "#0066b2",
            color: "white",
            ":hover": {
              backgroundColor: "#6699CC",
            },
            marginTop: "30px",
          }}
          onClick={handleErrorMessage}
        >
          Back
        </Button>
      </DialogContent>
    </Dialog>
  );
}
