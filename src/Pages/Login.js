import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const theme = createTheme();

export default function SignIn() {
	const { user, setUser, auth, setAuth, setBlog } =
		React.useContext(UserContext);

	const Navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Required"),
			password: Yup.string()
				.min(8, "Password contain minimum 8 characters")
				.max(15, "Password contain maximum 15 characters")
				.required("Required"),
		}),
		onSubmit: (values, { resetForm }) => {
			let local = JSON.parse(localStorage.getItem("Register"));
			console.log(local);
			// console.log("local", local.length);

			if (local) {
				let fetch = local;
				let data = fetch.find((object) => object.email === values.email);
				console.log(data);

				if (!data) {
					toast.warn("Email not found");
				} else if (data.password !== values.password) {
					toast.warn("Incorrect password");
				} else {
					// console.log(user);
					setUser(data);
					setBlog(data.blogs);
					// console.log(data.blogs);
					Navigate("/");
					console.log(user);
					toast.success("Login Successfully");

					// let auth = true;
					localStorage.setItem("Active", JSON.stringify(data));
					setAuth(true);
					console.log(auth);

					resetForm();
				}
			} else {
				toast.warn("You are not registerd please register ");
			}
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
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
					<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									// required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									// autoFocus
									onChange={formik.handleChange}
									// onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="errors">{formik.errors.email}</div>
								) : null}
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									// required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={formik.handleChange}
									// onBlur={formik.handleBlur}
									value={formik.values.password}
								/>
								{formik.touched.password && formik.errors.password ? (
									<div className="errors">{formik.errors.password}</div>
								) : null}
							</Grid>
						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container sx={{ justifyContent: "center" }}>
							<p
								className="redirectLink f-right"
								onClick={() => {
									Navigate("/register");
								}}
							>
								Don't have an account? Sign Up
							</p>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
