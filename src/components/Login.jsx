import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Spin } from "antd";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import ApiRoutes from "../utils/ApiRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (!formProps.email) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }

    if (!formProps.password) {
      setPasswordError("Password is required");
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    try {
      const res = await AxiosService.post(
        ApiRoutes.USER_LOGIN.path,
        formProps,
        {
          authenticate: ApiRoutes.USER_LOGIN.authenticate,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("name", res.data.name);

        toast.success("Log in Successfully");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/admin/dashboard");
      } else {
        toast.error(res.data.message || "Incorrect credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", width: "119%", marginLeft: "-130px" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://www.thetreegroup.co.uk/hubfs/crm-customer-relationship-management-business-internet-techology-concept-137888377.jpg)", backgroundRepeat: "no-repeat", backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: "cover", backgroundPosition: "center" }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 14, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                error={Boolean(emailError)}
                helperText={emailError}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                error={Boolean(passwordError)}
                helperText={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={showPassword}
                    color="primary"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                }
                label="Show Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ position: "relative" }}
              >
                <span style={{ width: "100%", height: "100%", display: "inline-block" }}>
                  {loading ? <Spin tip="Loading" size="small" /> : "Sign In"}
                </span>
              </Button>
              <Link
                to="/new-user"
                variant="body2"
                style={{ textAlign: "center", display: "block", cursor: "pointer" }}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
