
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";


interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: string;
  password: string;
  balance: string; 
  createdAt: string;
  updatedAt: string;
}

type Props = {
  data: User;
};

// Styled Avatar with a gradient background
const GradientAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#fff",
  border: `4px solid ${theme.palette.background.paper}`,
}));

function UserProfile(props: Props) {
  const { name, email, role, balance } = props.data;

  return (
    <Box sx={{ py: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Card
        sx={{
          maxWidth: 450,
          mx: "auto",
          mt: 10,
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          bgcolor: "#ffffff",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-4px)" },
        }}
      >
        <CardContent sx={{ p: 4 }}>
         
          <Box display="flex" alignItems="center" mb={3}>
            <GradientAvatar alt={name}>{name.charAt(0).toUpperCase()}</GradientAvatar>
            <Box ml={3}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#2c3e50",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {name}{" "}
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    textTransform: "lowercase",
                    color: "#757575",
                    fontWeight: "normal",
                  }}
                >
                  ({role})
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#424242", fontFamily: "Roboto, sans-serif" }}
              >
                {email}
              </Typography>
            </Box>
          </Box>

         
          <Divider sx={{ my: 2, borderColor: "#e0e0e0" }} />

          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "medium",
                color: "#1976d2",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Wallet Balance
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#388e3c",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              ${parseFloat(balance).toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;