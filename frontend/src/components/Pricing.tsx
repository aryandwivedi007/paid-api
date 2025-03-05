import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Box } from "@mui/material";

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Basic",
      price: "$9.99",
      features: ["10,000 API Requests", "Basic Support", "1 User"],
    },
    {
      title: "Pro",
      price: "$29.99",
      features: ["50,000 API Requests", "Priority Support", "5 Users", "Analytics Dashboard"],
    },
    {
      title: "Enterprise",
      price: "$99.99",
      features: ["Unlimited API Requests", "24/7 Support", "Unlimited Users", "Custom Integrations"],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#2c3e50",
          mb: 4,
          textAlign: "center",
        }}
      >
        Pricing Plans
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.title}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Georgia, serif", color: "#2c3e50", mb: 2 }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "Georgia, serif", color: "#1976d2", mb: 2 }}
                >
                  {plan.price}
                  <Typography component="span" variant="body2" sx={{ color: "#757575" }}>
                    /month
                  </Typography>
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {plan.features.map((feature) => (
                    <Typography
                      key={feature}
                      variant="body1"
                      sx={{ fontFamily: "Georgia, serif", color: "#424242", mb: 1 }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3,
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;