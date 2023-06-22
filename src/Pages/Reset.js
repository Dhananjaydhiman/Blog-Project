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

const theme = createTheme();

export default function Reset() {
	const Navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters")
				.max(15, "Maximum 15 characters")
				.required("Required"),
			confirmPassword: Yup.string()
				.required("Required")
				.oneOf([Yup.ref("password"), null], "Passwords must match"),
		}),
		onSubmit: (values, { resetForm }) => {
			let local = JSON.parse(localStorage.getItem("Register"));
			if (local && local.length > 0) {
				let emailExist = local.find((object) => object.email === values.email);
				if (emailExist) {
					toast.alert("Email Already Exist");
					Navigate("/login");
				} else {
					values.id = new Date().getTime();
					values.blogs = [];
					local.push(values);
					localStorage.setItem("Register", JSON.stringify(local));
					let fetch = JSON.parse(localStorage.getItem("Register"));
					console.log(fetch);
					toast.success("Registered Successfully");
				}
			} else {
				let Arr = [];
				values.id = new Date().getTime();
				values.blogs = [];
				Arr.push(values);
				localStorage.setItem("Register", JSON.stringify(Arr));
				let fetch = JSON.parse(localStorage.getItem("Register"));
				console.log(fetch);
				toast.success("Registered Successfully");
				Navigate("/login");
			}
			// alert(JSON.stringify(values, null, 2));
			resetForm();
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
						Reset Password
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={formik.handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							{/* <Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									// required
									fullWidth
									id="firstName"
									label="First Name"
									// autoFocus
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
								/>
								{formik.touched.firstName && formik.errors.firstName ? (
									<div className="errors">{formik.errors.firstName}</div>
								) : null}
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									// required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.lastName}
								/>
								{formik.touched.lastName && formik.errors.lastName ? (
									<div className="errors">{formik.errors.lastName}</div>
								) : null}
							</Grid> */}
							<Grid item xs={12}>
								<TextField
									// required
									fullWidth
									className="w-10"
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="errors">{formik.errors.email}</div>
								) : null}
							</Grid>
							<Grid item xs={12}>
								<TextField
									// required
									fullWidth
									name="password"
									label="New Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
								/>
								{formik.touched.password && formik.errors.password ? (
									<div className="errors">{formik.errors.password}</div>
								) : null}
							</Grid>
							<Grid item xs={12}>
								<TextField
									// required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="new-confirmPassword"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword}
								/>
								{formik.touched.confirmPassword &&
								formik.errors.confirmPassword ? (
									<div className="errors">{formik.errors.confirmPassword}</div>
								) : null}
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Reset
						</Button>
						<Grid container justifyContent="center">
							<Grid item fullWidth>
								<p
									className="redirectLink"
									onClick={() => {
										Navigate("/login");
									}}
								>
									Already have an account? Sign in
								</p>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
