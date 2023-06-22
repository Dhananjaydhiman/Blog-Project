import React from "react";
import { UserContext } from "../App";

const Footer = () => {
	const { user } = React.useContext(UserContext);
	return (
		<>
			<div class=" mt-5">
				<footer
					class="text-center text-white "
					style={{ background: "#1976d2" }}
				>
					<div class="container p-4 pb-0">
						<section class="">
							<div class="row d-flex justify-content-center">
								<div class="col-auto pt-2">
									<p class="">
										<strong>Sign up for our newsletter</strong>
									</p>
								</div>

								<div class="col-md-5 col-12 mb-4">
									<input type="email" id="form5Example2" class="form-control" />
								</div>

								<div class="col-auto">
									<button type="submit" class="btn btn-outline-light mb-4">
										Subscribe
									</button>
								</div>
							</div>
						</section>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
