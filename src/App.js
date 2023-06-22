import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router/Router";
import { useState } from "react";
// import { toast } from "react-toastify";

export const UserContext = React.createContext();

function App() {
	const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("Active")));
	const [user, setUser] = useState();
	const [blog, setBlog] = useState([]);

	React.useEffect(() => {
		let fetch = JSON.parse(localStorage.getItem("Active"));
		if (fetch) {
			console.log(fetch);
			let data = JSON.parse(localStorage.getItem("Register"));
			console.log(data);
			if (data.length > 1) {
				let clientData = data?.find((object) => object.email === fetch.email);
				console.log(clientData);
				setUser(clientData);
				setBlog(clientData.blogs);
			} else {
				setUser(data);
				setBlog(data.blogs);
			}
		}
	}, [setAuth]);

	return (
		<>
			<UserContext.Provider
				value={{ auth, setAuth, user, setUser, blog, setBlog }}
			>
				<Router />
				<ToastContainer />
			</UserContext.Provider>
		</>
	);
}

export default App;
