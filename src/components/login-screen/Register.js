import React, { useState } from "react";
import { Container, Avatar, Box, InputAdornment, IconButton, InputLabel, FormControl, Input, Button, Typography } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import "./Login.css";

const Register = (props) => {
	console.log("check", props);

	const [values, setValues] = useState({
		name: "",
		imageUrl: "",
		email: "",
		password: "",
		showPassword: false,
	});

	const changeName = ({ target }) => {
		setValues({ ...values, name: target.value });
	};

	const changeImageUrl = ({ target }) => {
		setValues({ ...values, imageUrl: target.value });
	};

	const changeEmail = ({ target }) => {
		setValues({ ...values, email: target.value });
	};

	const changePassword = ({ target }) => {
		setValues({ ...values, password: target.value });
	};

	const toggleShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	return (
		<Container fixed>
			<div className="login-screen">
				<Avatar src="/broken-image.jpg" className="avatar-icon" />
				<form autoComplete="off">
					<Box width={340} display="flex" flexDirection="column">
						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-email">Name</InputLabel>
							<Input
								id="standard-adornment-email"
								className="input-field"
								type="text"
								name="name"
								value={values.name}
								onChange={changeName}
								required
							/>
						</FormControl>

						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-email">
								Image Url <span style={{ fontSize: "13px" }}>optional*</span>
							</InputLabel>
							<Input
								id="standard-adornment-email"
								className="input-field"
								type="text"
								name="imageUrl"
								value={values.imageUrl}
								onChange={changeImageUrl}
								required
							/>
						</FormControl>

						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
							<Input
								id="standard-adornment-email"
								className="input-field"
								type="email"
								name="email"
								value={values.email}
								onChange={changeEmail}
								required
							/>
						</FormControl>

						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
							<Input
								id="standard-adornment-password"
								type={values.showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={toggleShowPassword}
											onMouseDown={(e) => e.preventDefault()}
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								value={values.password}
								onChange={changePassword}
							/>
						</FormControl>
						<Button type="submit" variant="contained" color="secondary" className="sign-in-btn">
							Sign In
						</Button>

						<Typography style={{ color: grey[600] }} paragraph={true}>
							Don't have an account? {"  "}
							<Typography
								variant="h6"
								display="inline"
								color="primary"
								style={{ cursor: "pointer" }}
								onClick={() => props.history.push("/login")}
							>
								login here
							</Typography>
						</Typography>
					</Box>
				</form>
			</div>
		</Container>
	);
};

export default Register;
