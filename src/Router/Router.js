import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import Navbar from "../Header/Navbar";
import Home from "../Components/Home";
import Blog from "../Components/Blog";
import PrivateRouting from "../Components/PrivateRouting";
import NoPage from "../Components/NoPage";
import { UserContext } from "../App";
import Profile from "../Components/Profile";
import Reset from "../Pages/Reset";

const Router = () => {
	const { auth, setUser } = React.useContext(UserContext);
	// console.log(auth);

	React.useEffect(() => {
		let fetch = JSON.parse(localStorage.getItem("Active"));
		if (fetch) {
			console.log(fetch);
			// setAuth(true);
			setUser(fetch);
		}
	}, [setUser]);

	let { id } = useParams();

	return (
		<>
			<BrowserRouter>
				{/* {auth && auth !== undefined ? <Navbar /> : ""} */}
				<Routes>
					<Route element={<PrivateRouting auth={auth} />}>
						<Route path="/" element={<Home />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/blog/:id" element={<Blog />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/reset-password" element={<Reset />} />
					<Route path="*" element={<NoPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
