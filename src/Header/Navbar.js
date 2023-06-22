import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

// const pages = ["Products", "Pricing", "Blog"];

function ResponsiveAppBar() {
	const { user } = React.useContext(UserContext);

	let navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// console.log(user);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						// component="a"
						// href="/"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}
					>
						BLOGGING
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						{/* <Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign="center">ABOUT</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign="center">CONTACT</Typography>
							</MenuItem>
						</Menu> */}
					</Box>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						// component="a"
						// href="/"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}
					>
						BLOGGING
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{/* <Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							ABOUT
						</Button>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							CONTACT
						</Button> */}
					</Box>
					<Box sx={{ flexGrow: 0, padding: "5px" }}>
						<h5 className="text-center">
							Hi, {user?.firstName} {user?.lastName}
						</h5>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0, float: "right" }}
							>
								<Avatar
									alt={user?.firstName}
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>

						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography
									textAlign="center"
									onClick={() => {
										navigate("/profile");
									}}
								>
									<AccountCircleOutlinedIcon sx={{ marginRight: "6px" }} />
									Profile
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography
									textAlign="center"
									onClick={() => {
										localStorage.removeItem("Active");
										navigate("/login");
										toast.success("Logout Successfully");
									}}
								>
									<LogoutOutlinedIcon /> Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
