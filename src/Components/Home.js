import React from "react";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import Card from "./Card";
import AddModal from "./AddModal";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
// import { UserContext } from "../App";

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="container">
				<div className=" pt-5 pb-4 w-100">
					<AddModal />
				</div>
				<h2>
					Blog Posts <SouthOutlinedIcon />
				</h2>

				<div className="row m-auto mt-4">
					<Card />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
