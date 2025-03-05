
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: "profile" | "logout") => {
    return () => {
      if (route) {
        if (route === "logout") {
          logoutUser();
        } else {
          navigate("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#2c3e50", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: "0 0 16px 16px", 
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              borderRadius: "12px", 
              "&:disabled": { opacity: 0.6 },
            }}
            disabled
          >
            <MenuIcon />
          </IconButton>

          
          <Box
            display="flex"
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", mr: 4 }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ecf0f1",
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
               Api Store
            </Typography>
          </Box>

         
          <Box display="flex" gap={3}>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: "#ecf0f1",
                textTransform: "none",
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                borderRadius: "12px", 
                px: 2,
                "&:hover": { bgcolor: "#34495e" },
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/pricing"
              sx={{
                color: "#ecf0f1",
                textTransform: "none",
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                borderRadius: "12px", 
                px: 2,
                "&:hover": { bgcolor: "#34495e" },
              }}
            >
              Pricing
            </Button>
          </Box>

          
          {isAuthenticated && (
            <Box marginLeft="auto">
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  borderRadius: "12px", 
                  "&:hover": { bgcolor: "#34495e" },
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose()}
                sx={{
                  "& .MuiPaper-root": {
                    bgcolor: "#34495e",
                    color: "#ecf0f1",
                    borderRadius: "12px", 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose("profile")}
                  sx={{
                    fontFamily: "Georgia, serif",
                    borderRadius: "8px", 
                    mx: 1, 
                    "&:hover": { bgcolor: "#2c3e50" },
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleClose("logout")}
                  sx={{
                    fontFamily: "Georgia, serif",
                    borderRadius: "8px", 
                    mx: 1,
                    "&:hover": { bgcolor: "#2c3e50" },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}