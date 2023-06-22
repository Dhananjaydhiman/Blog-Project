import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BlogImg from "../Images/Blog-img.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function MediaCard() {
	const { blog } = React.useContext(UserContext);
	let navigate = useNavigate();
	console.log(blog);

	return (
		<>
			{blog?.map((elem) => {
				return (
					<div className="box col-sm-4 col-md-4 col-lg-4 mb-4 ">
						<Card className="cards " key={elem.id} sx={{ maxWidth: 345 }}>
							<img
								src={BlogImg}
								alt="default img"
								className="img-fluid card-img"
								onClick={() => {
									navigate(`/blog/${elem.id}`);
								}}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									className="card-title py-2"
									onClick={() => {
										navigate(`/blog/${elem.id}`);
									}}
								>
									{elem.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{elem.date}
								</Typography>
							</CardContent>
						</Card>
					</div>
				);
			})}
			<Outlet />
		</>
	);
}
