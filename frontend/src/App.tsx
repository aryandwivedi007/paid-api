import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthenticatedLayout from "./layouts/Authenticated";
import BasicLayout from "./layouts/Basic";
import { ErrorFallback } from "./error/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";

// ✅ Lazy-loaded components
const Home = lazy(() => import("./pages/homepage"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Register = lazy(() => import("./pages/register"));
const PricingPage = lazy(() => import("./pages/pricingpage"));
const AboutPage = lazy(() => import("./pages/aboutpage"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}>
        <Routes>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route element={<BasicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
