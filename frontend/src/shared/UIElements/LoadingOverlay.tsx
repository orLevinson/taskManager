import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import loadingCtx from "../context/loadingCtx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const LoadingOverlay = () => {
  const { error, loading, setError } = useContext(loadingCtx);

  if (error) {
    return (
      <Dialog
        open={!!error}
        onClose={() => {
          setError(null);
        }}
        sx={{ zIndex: 1000 }}
      >
        <DialogTitle id="error-title">שגיאת מערכת</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-description">{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setError(null);
            }}
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (loading && !error) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
        {<CircularProgress color="inherit" />}
      </Backdrop>
    );
  }

  return <></>;
};

export default LoadingOverlay;
