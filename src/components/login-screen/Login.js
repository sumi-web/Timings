import React from "react";
import { Container, TextField, Avatar, Box, InputAdornment, IconButton, InputLabel, FormControl, Input } from "@material-ui/core";

import "./Login.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Login = () => {
	return (
		<Container fixed>
			<div className="login-screen">
				<Avatar src="/broken-image.jpg" className="avatar-icon" />
				<form autoComplete="off">
					<Box width={300} display="flex" flexDirection="column">
						<FormControl>
							<InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
							<Input id="standard-adornment-email" type="email" required />
						</FormControl>

						<FormControl className="">
							<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
							<Input
								id="standard-adornment-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton aria-label="toggle password visibility">{<Visibility />}</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</Box>
				</form>
			</div>
		</Container>
	);
};

export default Login;
