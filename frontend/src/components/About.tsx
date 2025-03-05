import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "12px",
          bgcolor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 3,
            textAlign: "center",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Georgia, serif",
            color: "#424242",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          Welcome to our platform! We are a dedicated team committed to providing top-notch API services for developers and businesses alike. Our mission is to simplify access to powerful tools and data, enabling innovation and growth.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Georgia, serif",
            color: "#424242",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          Founded in 2025, our journey began with a vision to create a seamless, reliable, and affordable API ecosystem. Whether you're building a weather app, integrating payment systems, or exploring new technologies, we're here to support you every step of the way.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Georgia, serif",
            color: "#424242",
            lineHeight: 1.8,
          }}
        >
          Contact us at <b>support@example.com</b> or explore our pricing to get started today!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;