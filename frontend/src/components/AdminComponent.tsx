// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   CircularProgress,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Card,
//   CardContent,
//   Box,
//   Button,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@mui/material";
// import { useGetApiAnalyticsQuery } from "../services/api";
// import { BarChart } from "@mui/x-charts/BarChart";
// import AddApiModule from "./AddApiModule";

// interface ApiUsageStats {
//   name: string;
//   email: string;
//   apiRequests: number;
//   totalSpent: number;
// }

// interface MostUsedApi {
//   name: string;
//   requestCount: number;
// }

// interface ApiAnalyticsResponse {
//   data: {
//     totalRevenue: string;
//     mostUsedApis: MostUsedApi[];
//     userStats: ApiUsageStats[];
//   };
//   message: string;
//   success: boolean;
// }

// const AdminDashboard: React.FC = () => {
//   const { data, isLoading, error } = useGetApiAnalyticsQuery();
//   const [open, setOpen] = useState(false);
//   const [selectedApi, setSelectedApi] = useState<string>("");

//   if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4, color: "#1976d2" }} />;
//   if (error) return <Typography color="error" variant="h6" sx={{ textAlign: "center", my: 4 }}>Failed to load analytics</Typography>;

//   const analytics = data?.data;
//   const mostUsedApis = analytics?.mostUsedApis || [];

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header Section */}
//       <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: "bold",
//             color: "#1976d2",
//             textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
//           }}
//         >
//           Admin Dashboard 📊
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setOpen(true)}
//           sx={{
//             borderRadius: "20px",
//             textTransform: "none",
//             px: 3,
//             py: 1,
//             boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//             "&:hover": { boxShadow: "0 6px 16px rgba(25, 118, 210, 0.5)" },
//           }}
//         >
//           Add API Module
//         </Button>
//       </Grid>

//       <Grid container spacing={4}>
//         {/* Total Revenue Card */}
//         <Grid item xs={12} md={4}>
//           <Card
//             elevation={6}
//             sx={{
//               bgcolor: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
//               color: "white",
//               textAlign: "center",
//               p: 3,
//               borderRadius: "16px",
//               transition: "transform 0.3s ease",
//               "&:hover": { transform: "scale(1.05)" },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: "medium",color:"black", mb: 1 }}>
//                 Total Revenue
//               </Typography>
//               <Typography variant="h3" sx={{ fontWeight: "bold",color:"black" }}>
//                 ${parseFloat(analytics?.totalRevenue || "0.00").toFixed(2)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* API Usage Bar Chart */}
//         <Grid item xs={12} md={8}>
//           <Paper
//             elevation={4}
//             sx={{
//               p: 3,
//               borderRadius: "12px",
//               bgcolor: "#fff",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ mb: 2, fontWeight: "bold", color: "#424242" }}
//             >
//               API Usage Overview
//             </Typography>
//             <BarChart
//               dataset={mostUsedApis.map((api) => ({
//                 name: api.name,
//                 count: parseInt(api.requestCount),
//               }))}
//               xKey="name"
//               series={[{ dataKey: "count", label: "Requests", color: "#ff9800" }]}
//               height={250}
//               sx={{
//                 "& .MuiChartsAxis-label": { fill: "#616161" },
//                 "& .MuiChartsLegend-label": { fill: "#616161" },
//               }}
//             />
//           </Paper>
//         </Grid>

//         {/* Most Used APIs - Dropdown & Details */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={4}
//             sx={{
//               p: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               gutterBottom
//               sx={{ fontWeight: "bold", color: "#424242" }}
//             >
//               Most Used APIs
//             </Typography>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <Select
//                 value={selectedApi}
//                 onChange={(e) => setSelectedApi(e.target.value)}
//                 displayEmpty
//                 sx={{
//                   borderRadius: "8px",
//                   "& .MuiSelect-select": { py: 1.5 },
//                   "&:hover": { bgcolor: "#f5f5f5" },
//                 }}
//               >
//                 <MenuItem value="" sx={{ color: "#757575" }}>
//                   Select an API
//                 </MenuItem>
//                 {mostUsedApis.map((api) => (
//                   <MenuItem
//                     key={api.name}
//                     value={api.name}
//                     sx={{ "&:hover": { bgcolor: "#e0f7fa" } }}
//                   >
//                     {api.name} ({api.requestCount} requests)
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             {selectedApi && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   p: 2,
//                   bgcolor: "#f9f9f9",
//                   borderRadius: "8px",
//                   boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   <b>API Name:</b> {selectedApi}
//                 </Typography>
//                 <Typography variant="body2">
//                   <b>Requests:</b>{" "}
//                   {mostUsedApis.find((api) => api.name === selectedApi)?.requestCount || 0}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* User API Usage Table */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={4}
//             sx={{
//               p: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ mb: 2, fontWeight: "bold", color: "#424242" }}
//             >
//               User API Usage
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "#616161" }}>
//                     User
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#616161" }} align="right">
//                     Requests
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#616161" }} align="right">
//                     Total Spent ($)
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {analytics?.userStats.map((user) => (
//                   <TableRow
//                     key={user.email}
//                     hover
//                     sx={{
//                       "&:hover": { bgcolor: "#f5f5f5", transition: "background-color 0.2s ease" },
//                     }}
//                   >
//                     <TableCell sx={{ color: "#424242" }}>
//                       {user.name} ({user.email})
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: "#424242" }}>
//                       {user.apiRequests}
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: "#424242" }}>
//                       ${parseFloat(user.totalSpent.toString()).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//       </Grid>
//       <AddApiModule open={open} handleClose={() => setOpen(false)} />
//     </Container>
  
//   );
// };

// export default AdminDashboard;
import React, { useState, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useGetApiAnalyticsQuery } from "../services/api";
import { BarChart } from "@mui/x-charts/BarChart";
import AddApiModule from "./AddApiModule";

// ✅ TypeScript Interfaces
interface ApiUsageStats {
  name: string;
  email: string;
  apiRequests: number;
  totalSpent: number;
}

interface MostUsedApi {
  name: string;
  requestCount: number;
}

interface ApiAnalyticsResponse {
  data: {
    totalRevenue: string;
    mostUsedApis: MostUsedApi[];
    userStats: ApiUsageStats[];
  };
  message: string;
  success: boolean;
}

const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useGetApiAnalyticsQuery(undefined, {
    pollingInterval: 60000, // Refresh every 60s
    refetchOnMountOrArgChange: false, // Avoid unnecessary refetching
  });

  const [open, setOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState<string>("");

  // ✅ Cache API Data to avoid recalculations on re-render
  const analytics = useMemo(() => data?.data, [data]);
  const mostUsedApis = useMemo(() => analytics?.mostUsedApis || [], [analytics]);
  const userStats = useMemo(() => analytics?.userStats || [], [analytics]);

  // ✅ Memoized API Selection Handler
  const handleApiSelection = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedApi(event.target.value as string);
  }, []);

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4, color: "#1976d2" }} />;
  if (error) return <Typography color="error" variant="h6" sx={{ textAlign: "center", my: 4 }}>Failed to load analytics</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
          Admin Dashboard 📊
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ borderRadius: "20px", textTransform: "none", px: 3, py: 1 }}>
          Add API Module
        </Button>
      </Grid>

      <Grid container spacing={4}>
        {/* Total Revenue Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={6} sx={{ bgcolor: "#1e88e5", color: "white", textAlign: "center", p: 3, borderRadius: "16px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "medium", color: "black", mb: 1 }}>
                Total Revenue
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "black" }}>
                ${parseFloat(analytics?.totalRevenue || "0.00").toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* API Usage Bar Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: "12px", bgcolor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#424242" }}>API Usage Overview</Typography>
            <BarChart
              dataset={mostUsedApis.map((api) => ({ name: api.name, count: parseInt(api.requestCount) }))}
              xKey="name"
              series={[{ dataKey: "count", label: "Requests", color: "#ff9800" }]}
              height={250}
            />
          </Paper>
        </Grid>

        {/* Most Used APIs - Dropdown & Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#424242" }}>Most Used APIs</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select value={selectedApi} onChange={handleApiSelection} displayEmpty>
                <MenuItem value="" sx={{ color: "#757575" }}>Select an API</MenuItem>
                {mostUsedApis.map((api) => (
                  <MenuItem key={api.name} value={api.name}>{api.name} ({api.requestCount} requests)</MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedApi && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: "8px" }}>
                <Typography variant="body1"><b>API Name:</b> {selectedApi}</Typography>
                <Typography variant="body2"><b>Requests:</b> {mostUsedApis.find((api) => api.name === selectedApi)?.requestCount || 0}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* User API Usage Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#424242" }}>User API Usage</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#616161" }}>User</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#616161" }} align="right">Requests</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#616161" }} align="right">Total Spent ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStats.map((user) => (
                  <TableRow key={user.email} hover>
                    <TableCell sx={{ color: "#424242" }}>{user.name} ({user.email})</TableCell>
                    <TableCell align="right" sx={{ color: "#424242" }}>{user.apiRequests}</TableCell>
                    <TableCell align="right" sx={{ color: "#424242" }}>
                      ${parseFloat(user.totalSpent.toString()).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <AddApiModule open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default AdminDashboard;
