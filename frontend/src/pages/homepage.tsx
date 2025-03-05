import { Box, CircularProgress, Typography } from "@mui/material";
import AdminDashboard from "../components/AdminComponent";
import UserDashboard from "../components/UserComponent";
import { useMeQuery } from "../services/api";

const Home = () => {
  const { data, isLoading, error } = useMeQuery();

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
  }

  if (error) {
    return <Typography color="error">Failed to load user data</Typography>;
  }

  const userRole = data?.data?.role; // Ensure this matches the backend response

  return (
    <Box>
      {userRole === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
    </Box>
  );
};

export default Home;
