import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../utils/ApiRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (!formProps.email) {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }

    if (!formProps.password) {
      setPasswordError("Password is required");
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

        if (!toastShown) {
          toast.success("Log in Successfully");
          setToastShown(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/admin/dashboard");
      } else {
        if (!toastShown) {
          toast.error(res.data.message);
          setToastShown(true);
        }
      }
    } catch (error) {
      if (!toastShown) {
        toast.error(error.response?.data?.message || "An error occurred");
        setToastShown(true);
      }
    }
  };

  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", width: "119%", marginLeft: "-127px" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.thetreegroup.co.uk/hubfs/crm-customer-relationship-management-business-internet-techology-concept-137888377.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "calc(100vh - 10px)" 
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            {/* <img
              src="http://miebach.thelinkworks.com:3000/_next/static/media/sign-bg1.b8a93cd3.png"
              alt=""
              style={{ marginLeft: "-110px", opacity: "0.2"}}
            /> */}
            <Box
              sx={{
                my: 8,
                mx: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
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
                >
                  Sign In
                </Button>
                <Link
                  to="/new-user"
                  variant="body2"
                  style={{
                    textAlign: "center",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Login;