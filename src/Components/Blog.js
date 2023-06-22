import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Navbar from "../Header/Navbar";
// import BlogImg from "../Images/Blog-img.jpg";
import BlogLg from "../Images/Blog-lg.jpg";
import Footer from "../Footer/Footer";
// import Blog2 from "../Images/Blog2.jpg";

const Blog = () => {
	const { user, blog, setBlog } = React.useContext(UserContext);
	let navigate = useNavigate();
	const { id } = useParams();
	console.log(id);

	const item = blog?.find((item) => item.id == id);

	const deleteBlog = () => {
		let existBlogs = [...blog];
		let index = existBlogs?.findIndex((object) => object.id === id);
		existBlogs.splice(index, 1);
		setBlog(existBlogs);
		navigate("/");

		let local = JSON.parse(localStorage.getItem("Register"));
		let clients = [...local];
		if (local && local.length > 0) {
			let client = clients?.find((object) => object.email === user.email);
			console.log(client);
			let clientIndex = clients?.findIndex(
				(object) => object.email === user.email
			);
			console.log(clientIndex);
			let blogIndex = client.blogs.findIndex((object) => object.id == id);
			client.blogs.splice(blogIndex, 1);
			console.log(client);
			clients.splice(clientIndex, 1, client);
			localStorage.setItem("Register", JSON.stringify(clients));
			console.log(client);
			let update = JSON.parse(localStorage.getItem("Register"));
			console.log(update);
		} else {
			// 	let client = local?.find((object) => object.email === user.email);
			// let clientIndex = local?.findIndex((object) => object.email === user.email);
			let blogIndex = clients.blogs.findIndex((object) => object.id === id);
			clients.blogs.splice(blogIndex, 1);
			// local.splice(clientIndex, 1, local);
			localStorage.setItem("Register", JSON.stringify(clients));
			console.log(clients);
		}
	};

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="my-3 ">
					<Button
						style={{ float: "left" }}
						variant="contained"
						className="my-3 "
						onClick={() => {
							navigate(-1);
						}}
					>
						<KeyboardBackspaceIcon /> Back
					</Button>
					<Button
						variant="contained"
						className="my-3 "
						sx={{ float: "right" }}
						startIcon={<DeleteIcon />}
						onClick={deleteBlog}
					>
						{" "}
						Delete Blog
					</Button>
				</div>

				<div className="blog-desc  w-100">
					{/* <div>
						<img src={BlogLg} alt="Blog-lg" className="img-fluid rounded " />
					</div> */}
					<div className="blogSec1 text-center">
						<h1>{item?.title}</h1>
						<p>{item?.date}</p>
					</div>
				</div>
				<div className="blog-info">
					<h1>{item?.title}</h1>
					<p>
						{" "}
						By:{" "}
						<span>
							{user?.firstName} {user?.lastName}
						</span>
					</p>
					{/* <div>{item?.description}</div> */}
					<div dangerouslySetInnerHTML={{ __html: item?.description }} />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Blog;
