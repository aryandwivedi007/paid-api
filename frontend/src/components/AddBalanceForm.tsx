import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useAddBalanceMutation } from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddBalanceForm: React.FC = () => {
  const [amount, setAmount] = React.useState<number>(0);
  const [cardNumber, setCardNumber] = React.useState<string>(""); // Dummy field
  const [cvc, setCvc] = React.useState<string>(""); // Dummy field
  const [addBalance, { isLoading, error, data }] = useAddBalanceMutation();

  const handleAddBalance = async () => {
    try {
      const response = await addBalance({ amount }).unwrap();
      toast.success(`Balance added: ${response.data.newBalance}`);
      setAmount(0);
      setCardNumber("");
      setCvc("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add balance");
    }
  };

  // Framer Motion variants for button hover/tap
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#ffffff", // White background like AddApiModule
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1976d2", // Blue header like AddApiModule
          fontFamily: "Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        Add Balance
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            fullWidth
            variant="outlined"
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa", // Light gray input background
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="1234 5678 9012 3456"
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="123"
            inputProps={{ maxLength: 3 }}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBalance}
              disabled={isLoading || amount <= 0}
              fullWidth
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                py: 1,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" },
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                "&:hover": { boxShadow: "0 4px 12px rgba(25, 118, 210, 0.5)" },
              }}
            >
              {isLoading ? "Adding..." : "Add Balance"}
            </Button>
          </motion.div>
        </Grid>
        {data && (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                color: "#388e3c", // Green for success
                fontFamily: "Roboto, sans-serif",
                textAlign: "center",
              }}
            >
              New Balance: ${data.data.newBalance}
            </Typography>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography
              color="error"
              variant="body1"
              sx={{ fontFamily: "Roboto, sans-serif", textAlign: "center" }}
            >
              Error: {(error as any)?.data?.message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AddBalanceForm;