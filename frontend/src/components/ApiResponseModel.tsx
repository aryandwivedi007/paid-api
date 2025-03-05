import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

// ✅ Define TypeScript Props
interface TestApiModalProps {
  open: boolean;
  onClose: () => void;
  apiResponse?: any; // You can refine this type if needed
}

const ApiResponseModel: React.FC<TestApiModalProps> = ({ open, onClose, apiResponse }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>API Response</DialogTitle>
      <DialogContent>
        {apiResponse ? (
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(apiResponse, null, 2)}
          </Typography>
        ) : (
          <Typography>No response data available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiResponseModel;
