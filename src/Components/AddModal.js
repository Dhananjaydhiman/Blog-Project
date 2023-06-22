import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import MyEditor from "./MyEditor";
import { SignalCellularConnectedNoInternet2BarSharp } from "@mui/icons-material";
// import { Editor } from "react-draft-wysiwyg";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "draft-js/dist/Draft.css";

const AddModal = () => {
	const { blog, setBlog, user, setUser } = React.useContext(UserContext);

	// const [editorState, setEditorState] = React.useState(editorState.createEmpty());

	const formik = useFormik({
		initialValues: {
			title: "",
			// image: "",
			description: "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Required"),
			// image: Yup.string().required("Required"),
			description: Yup.string().required("Required"),
		}),
		onSubmit: (values, { resetForm }) => {
			let local = JSON.parse(localStorage.getItem("Register"));
			let clients = [...local];
			if (local) {
				console.log("Check copy of clients", clients);
				const d = new Date();
				values.date = d.toDateString();
				values.time = d.toLocaleTimeString();
				values.id = new Date().getTime();
				let client = clients?.find((object) => object.email === user.email);
				client.blogs.push(values);
				if (local.length > 0) {
					let index = clients.findIndex(
						(object) => object.email === client.email
					);
					console.log(index);

					clients.splice(index, 1, client);
					localStorage.setItem("Register", JSON.stringify(clients));
				} else {
					localStorage.setItem("Register", JSON.stringify(clients));
				}
				let check = JSON.parse(localStorage.getItem("Register"));
				console.log(client);
				console.log(check);
				console.log(values);
				setUser(client);

				let blogs = [...blog];
				blogs.push(values);
				setBlog(blogs);
				console.log(user);
				toast.success("Blog Added Successfully");
				console.log(values);

				// console.log(user);
			} else {
				console.log("Errorrrrrrrrrrrrrrrrrrrrrrrrrrr");
			}
			resetForm();
		},
	});

	return (
		<div>
			{/* <!-- Button trigger modal --> */}

			<Button
				type="button"
				// class="btn btn-primary"
				variant="contained"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
				style={{ float: "right" }}
			>
				<AddOutlinedIcon /> Add Blog
			</Button>

			{/* <!-- Modal --> */}
			<div
				class="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">
								Add Blog
							</h1>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<form onSubmit={formik.handleSubmit}>
							<div class="modal-body">
								<div className="FieldBox">
									<label htmlFor="title">Title</label> <br />
									<input
										id="title"
										name="title"
										type="text"
										placeholder="Enter your title "
										class="w-100"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.title}
									/>
									{formik.touched.title && formik.errors.title ? (
										<div classname="error">{formik.errors.title}</div>
									) : null}
								</div>
								{/* <div className="FieldBox">
									<label htmlFor="image">Image</label> <br />
									<input
										id="image"
										name="image"
										type="file"
										class="w-100"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.image}
									/>
									{formik.touched.image && formik.errors.image ? (
										<div classname="error">{formik.errors.image}</div>
									) : null}
								</div> */}
								<div className="FieldBox">
									<label htmlFor="description">Description</label> <br />
									{/* <Editor
										//   defaultEditorState={editorState}
										//   onEditorStateChange={setEditorState}
										id="description"
										name="description"
										type="description"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.description}
										wrapperClassName="wrapper-class"
										editorClassName="editor-class"
										toolbarClassName="toolbar-class"
									/> */}
									{/* <MyEditor /> */}
									<textarea
										id="description"
										name="description"
										type="description"
										placeholder="Enter your description"
										class="w-100"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.description}
									/>
									{formik.touched.description && formik.errors.description ? (
										<div classname="error">{formik.errors.description}</div>
									) : null}
								</div>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="submit" class="btn btn-primary">
									Add
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddModal;
