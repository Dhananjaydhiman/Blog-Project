import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "../App";

const PrivateRouting = ({ auth }) => {
	// const { auth } = React.useContext(UserContext);
	return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouting;
