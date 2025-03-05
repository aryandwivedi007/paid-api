// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import {
//   useGetAllApiModulesQuery,
//   useTestApiUsageMutation,
// } from "../services/api";
// import { toast } from "react-toastify";
// import TestApiModal from "./ApiResponseModel";
// import AddBalanceForm from "./AddBalanceForm";

// interface ApiModule {
//   id: string;
//   name: string;
//   isFree: boolean;
//   _pricePerRequest: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const UserDashboard: React.FC = () => {
//   const { data, isLoading, error } = useGetAllApiModulesQuery();
//   const [
//     testApi,
//     { isLoading: isTesting, data: apiResponse, error: testError },
//   ] = useTestApiUsageMutation();
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
//   const [showAddBalance, setShowAddBalance] = useState(false);

//   const handleTestApi = async (apiId: string) => {
//     try {
//       const response = await testApi(apiId).unwrap();
//       setSelectedApiId(apiId);
//       setOpenModal(true);
//       toast.success("API Test Successful");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "API Test Failed");
//     }
//   };

//   const toggleAddBalance = () => {
//     setShowAddBalance(!showAddBalance);
//   };

//   const getApiUrl = (apiModuleId: string) => {
//     return `http://localhost:5000/api/api-usage/${apiModuleId}`;
//   };

//   if (isLoading)
//     return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
//   if (error)
//     return <Typography color="error">Failed to load API modules</Typography>;

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         sx={{ my: 3, fontWeight: "bold", textAlign: "center" }}
//       >
//         Available APIs 🚀
//       </Typography>

//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={toggleAddBalance}
//             sx={{ mb: 2 }}
//           >
//             {showAddBalance ? "Hide Add Balance" : "Add Balance"}
//           </Button>

//           {showAddBalance && (
//             <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
//               <AddBalanceForm />
//             </Paper>
//           )}

//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               API Modules
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>API Name</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>API URL</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }} align="right">
//                     Cost ($)
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }} align="right">
//                     Free?
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }} align="right">
//                     Test API
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {data?.data.map((api: ApiModule) => (
//                   <TableRow key={api.id} hover>
//                     <TableCell>{api.name}</TableCell>
//                     <TableCell>
//                       <Typography
//                         variant="body2"
//                         sx={{ wordBreak: "break-all" }}
//                       >
//                         {getApiUrl(api.id)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       {parseFloat(api._pricePerRequest).toFixed(2)}
//                     </TableCell>
//                     <TableCell align="right">
//                       {api.isFree ? "✅ Yes" : "❌ No"}
//                     </TableCell>
//                     <TableCell align="right">
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         size="small"
//                         onClick={() => handleTestApi(api.id)}
//                         disabled={isTesting && selectedApiId === api.id}
//                       >
//                         {isTesting && selectedApiId === api.id
//                           ? "Testing..."
//                           : "Test API"}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//       </Grid>

//       <TestApiModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         apiResponse={apiResponse?.data}
//       />
//     </Container>
//   );
// };

// export default UserDashboard;
import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  useGetAllApiModulesQuery,
  useTestApiUsageMutation,
} from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TestApiModal from "./ApiResponseModel";
import AddBalanceForm from "./AddBalanceForm";

interface ApiModule {
  id: string;
  name: string;
  isFree: boolean;
  _pricePerRequest: string;
  createdAt: string;
  updatedAt: string;
}

const UserDashboard: React.FC = () => {
  const { data, isLoading, error } = useGetAllApiModulesQuery();
  const [
    testApi,
    { isLoading: isTesting, data: apiResponse, error: testError },
  ] = useTestApiUsageMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
  const [showAddBalance, setShowAddBalance] = useState(false);

  const handleTestApi = async (apiId: string) => {
    try {
      const response = await testApi(apiId).unwrap();
      setSelectedApiId(apiId);
      setOpenModal(true);
      toast.success("API Test Successful");
    } catch (err: any) {
      toast.error(err?.data?.message || "API Test Failed");
    }
  };

  const toggleAddBalance = () => {
    setShowAddBalance(!showAddBalance);
  };

  const getApiUrl = (apiModuleId: string) => {
    return `http://localhost:5000/api/api-usage/${apiModuleId}`;
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

  // Framer Motion variants for AddBalanceForm animation
  const formVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: "auto", marginBottom: 4, transition: { duration: 0.3, ease: "easeOut" } },
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress sx={{ color: "#1976d2" }} />
      </Box>
    );
  if (error)
    return (
      <Typography
        color="error"
        variant="h6"
        sx={{ textAlign: "center", my: 4 }}
      >
        Failed to load API modules
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          my: 3,
          fontWeight: "bold",
          color: "#1976d2",
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Available APIs 🚀
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleAddBalance}
              sx={{
                mb: 2,
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": { bgcolor: "#e3f2fd", borderColor: "#1565c0" },
              }}
            >
              {showAddBalance ? "Hide Add Balance" : "Add Balance"}
            </Button>
          </motion.div>

          {showAddBalance && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  mb: 4,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <AddBalanceForm />
              </Paper>
            </motion.div>
          )}

          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                bgcolor: "#ffffff",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#424242",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                API Modules
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#616161" }}>
                      API Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#616161" }}>
                      API URL
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#616161" }}
                      align="right"
                    >
                      Cost ($)
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#616161" }}
                      align="right"
                    >
                      Free?
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#616161" }}
                      align="right"
                    >
                      Test API
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((api: ApiModule) => (
                    <TableRow
                      key={api.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                          transition: "background-color 0.2s ease",
                        },
                      }}
                    >
                      <TableCell sx={{ color: "#424242" }}>{api.name}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            wordBreak: "break-all",
                            color: "#424242",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          {getApiUrl(api.id)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#424242" }}>
                        {parseFloat(api._pricePerRequest).toFixed(2)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#424242" }}>
                        {api.isFree ? "✅ Yes" : "❌ No"}
                      </TableCell>
                      <TableCell align="right">
                        <motion.div
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleTestApi(api.id)}
                            disabled={isTesting && selectedApiId === api.id}
                            sx={{
                              borderRadius: "12px",
                              textTransform: "none",
                              px: 2,
                              bgcolor: "#1976d2",
                              "&:hover": { bgcolor: "#1565c0" },
                              "&:disabled": { bgcolor: "#b0bec5" },
                            }}
                          >
                            {isTesting && selectedApiId === api.id
                              ? "Testing..."
                              : "Test API"}
                          </Button>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <TestApiModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        apiResponse={apiResponse?.data}
      />
    </Container>
  );
};

export default UserDashboard;