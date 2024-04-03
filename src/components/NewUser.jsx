import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (firstName.length < 4) {
      toast.error("First name must be at least 4 characters");
      return;
    }

    if (lastName.length < 4) {
      toast.error("Last name must be at least 4 characters");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Email must include '@'");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("https://capstone-vbjb.onrender.com/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Account created successfully", { autoClose: 2000 });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else if (response.status === 400) {
        toast.error("User already exists");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <img
            src="https://t3.ftcdn.net/jpg/03/75/77/90/360_F_375779088_kjTKvm0iUspPsf4rAX9BeO5dlRnAOyPz.jpg"
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              filter: "blur(8px)",
            }}
          />
        </Box>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 11,
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "20px",
              backgroundColor: "whitesmoke",
              marginLeft: "30px",
              width: "100%",
              height: "100%",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", marginLeft: "150px" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "hwb(195 23% 5%)",
                fontWeight: "bold",
                marginLeft: "130px",
              }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
