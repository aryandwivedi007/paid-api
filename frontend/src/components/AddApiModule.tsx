import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useCreateApiModuleMutation } from "../services/api";
import { motion } from "framer-motion";

// Validation Schema
const validationSchema = yup.object({
  name: yup.string().required("API Name is required"),
  description: yup.string().required("Description is required"),
  pricePerRequest: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Price must be at least 0")
    .required("Price per request is required"),
  isFree: yup.boolean().required("Select Free or Paid API"),
});

// Type for Form Data
type ApiModuleFormData = yup.InferType<typeof validationSchema>;

interface AddApiModuleProps {
  open: boolean;
  handleClose: () => void;
}

const AddApiModule: React.FC<AddApiModuleProps> = ({ open, handleClose }) => {
  const [createApiModule] = useCreateApiModuleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ApiModuleFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "Weather API",
      description: "Fetch weather data",
      pricePerRequest: 1,
      isFree: false,
    },
  });

  const onSubmit = async (data: ApiModuleFormData) => {
    try {
      await createApiModule(data).unwrap();
      toast.success("API module created successfully!");
      reset();
      handleClose();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to create API module");
    }
  };

  // Framer Motion variants for dialog animation
  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Framer Motion variants for button hover/tap
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperComponent={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dialogVariants}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          bgcolor: "#ffffff", // Explicit white background
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // Stronger shadow for visibility
          overflow: "hidden",
        },
        "& .MuiBackdrop-root": { bgcolor: "rgba(0,0,0,0.6)" }, // Darker backdrop
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          py: 2,
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Add API Module
      </DialogTitle>
      <DialogContent
        sx={{
          p: 3,
          bgcolor: "#ffffff", // Ensure content has a white background
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 2,
          }}
        >
          <TextField
            label="API Name"
            fullWidth
            variant="outlined"
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa", // Light gray input background
              },
            }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            {...register("description")}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa",
              },
            }}
          />
          <TextField
            label="Price per Request ($)"
            type="number"
            fullWidth
            variant="outlined"
            {...register("pricePerRequest")}
            error={Boolean(errors.pricePerRequest)}
            helperText={errors.pricePerRequest?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                bgcolor: "#fafafa",
              },
            }}
          />
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant={watch("isFree") ? "contained" : "outlined"}
              color="primary"
              onClick={() => setValue("isFree", !watch("isFree"))}
              fullWidth
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                py: 1,
                bgcolor: watch("isFree") ? "#1976d2" : "transparent",
                borderColor: "#1976d2",
                color: watch("isFree") ? "white" : "#1976d2",
                "&:hover": {
                  bgcolor: watch("isFree") ? "#1565c0" : "#e3f2fd",
                  borderColor: "#1565c0",
                },
              }}
            >
              {watch("isFree") ? "Free API" : "Paid API"}
            </Button>
          </motion.div>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          bgcolor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={handleClose}
            sx={{
              color: "#757575",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
          >
            Cancel
          </Button>
        </motion.div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
              "&:hover": { boxShadow: "0 4px 12px rgba(25, 118, 210, 0.5)" },
            }}
          >
            Create
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
};

export default AddApiModule;