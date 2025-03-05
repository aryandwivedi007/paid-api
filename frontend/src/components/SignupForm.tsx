// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Theme,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { createStyles } from "@mui/styles";
// import { CSSProperties } from "react";
// import { useForm } from "react-hook-form";
// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { useRegisterMutation } from "../services/api";
// import PasswordInput from "./PasswordInput";

// const validation = yup.object({
//   email: yup.string().email("Email is invalid").required("Email is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(5, "Minimumn 5 chars are required")
//     .max(16, "Miximumn 16 chars allowed"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "Passwords must match")
//     .required("Comfirm password is required"),
//   name: yup.string().required("Name is required"),
// });

// const useStyle = (theme: Theme) =>
//   createStyles({
//     root: {
//       maxWidth: 400,
//       flex: 1,
//       mx: "auto",
//     },
//     input: {
//       mt: 2,
//     },
//     button: {
//       my: 2,
//     },
//     link: {
//       color: theme.palette.primary.main,
//     },
//   });

// type FormData = typeof validation.__outputType;

// export default function SignupForm() {
//   const theme = useTheme();
//   const style = useStyle(theme);
//   const [registerUser] = useRegisterMutation();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
      
//     },
//     resolver: yupResolver(validation),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       await registerUser(data).unwrap();
//       toast.success("User register successfully!");
//       navigate("/");
//     } catch (error: any) {
//       const validationError = error?.data?.data?.errors?.[0].msg;
//       toast.error(
//         validationError ?? error?.data?.message ?? "Something went wrong!"
//       );
//     }
//   };

//   return (
//     <Box
//       height="100vh"
//       width="100vw"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Card variant="outlined" sx={style.root}>
//         <CardContent>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             <Box>
//               <Typography variant="h4" component="h1">
//                 <b>Signup</b>
//               </Typography>
//             </Box>
//             <TextField
//               sx={style.input}
//               fullWidth
//               type="text"
//               placeholder="Name"
//               label="Name"
//               {...register("name")}
//               error={Boolean(errors.name?.message)}
//               helperText={errors.name?.message}
//             />
//             <TextField
//               sx={style.input}
//               fullWidth
//               type="text"
//               placeholder="Email"
//               label="Email"
//               {...register("email")}
//               error={Boolean(errors.email?.message)}
//               helperText={errors.email?.message}
//             />
//             <PasswordInput
//               sx={style.input}
//               fullWidth
//               type="password"
//               placeholder="password"
//               label="Password"
//               error={Boolean(errors.password?.message)}
//               helperText={errors.password?.message}
//               {...register("password")}
//             />
//             <PasswordInput
//               sx={style.input}
//               fullWidth
//               type="password"
//               placeholder="Confirm Password"
//               label="Confirm password"
//               error={Boolean(errors.confirmPassword?.message)}
//               helperText={errors.confirmPassword?.message}
//               {...register("confirmPassword")}
//             />
//             <Button
//               type="submit"
//               sx={style.button}
//               variant="contained"
//               fullWidth
//               disabled={!isValid}
//             >
//               Signup
//             </Button>
//             <Typography>
//               Already have an account?{" "}
//               <NavLink style={style.link as CSSProperties} to="/login">
//                 Sign in
//               </NavLink>
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../services/api";
import { motion } from "framer-motion";
import PasswordInput from "./PasswordInput";

// Validation Schema
const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  name: yup.string().required("Name is required"),
});

type FormData = yup.InferType<typeof validation>;

export default function SignupForm() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Framer Motion variants for button hover/tap
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5", // Light gray background for contrast
      }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 400,
            mx: "auto",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            bgcolor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2", // Blue for a welcoming feel
                    fontFamily: "Roboto, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Signup
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="text"
                placeholder="Name"
                label="Name"
                {...register("name")}
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    bgcolor: "#fafafa",
                  },
                }}
              />
              <TextField
                fullWidth
                type="text"
                placeholder="Email"
                label="Email"
                {...register("email")}
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    bgcolor: "#fafafa",
                  },
                }}
              />
              <PasswordInput
                fullWidth
                type="password"
                placeholder="Password"
                label="Password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password")}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    bgcolor: "#fafafa",
                  },
                }}
              />
              <PasswordInput
                fullWidth
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                error={Boolean(errors.confirmPassword?.message)}
                helperText={errors.confirmPassword?.message}
                {...register("confirmPassword")}
                sx={{
                  mb: 3,
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
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    py: 1.5,
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                    "&:disabled": { bgcolor: "#b0bec5" },
                  }}
                >
                  Signup
                </Button>
              </motion.div>
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#424242",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                  onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Sign in
                </NavLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}