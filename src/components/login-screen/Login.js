import React, { useState } from "react";
import {
	Container,
	Avatar,
	Box,
	InputAdornment,
	IconButton,
	InputLabel,
	FormControl,
	Input,
	Button,
	Typography,
	FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import "./Login.css";

const Login = (props) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const [inputErrors, setInputErrors] = useState({});

	const changeEmail = ({ target }) => {
		setValues({ ...values, email: target.value });
	};

	const changePassword = ({ target }) => {
		setValues({ ...values, password: target.value });
	};

	const toggleShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const LoginUser = (e) => {
		e.preventDefault();
		const errors = checkForErrorsBeforeSubmit();
		if (Object.keys(errors).length > 0) {
			setInputErrors({ ...errors });
		} else {
			console.log("sumit");
		}
	};

	const checkForErrorsBeforeSubmit = () => {
		const errors = {};

		const emailRegex = /\S+@\S+\.\S+/;

		if (values.email.trim() === "") {
			errors.email = "email can not be empty";
		} else if (!emailRegex.test(values.email)) {
			errors.email = "invalid email format";
		}

		if (values.password.trim() === "") {
			errors.password = "password can not be empty";
		} else if (values.password.trim().length <= 7) {
			errors.password = "password should contain 8 letters atleast";
		} else if (!/[A-Z]/.test(values.password)) {
			errors.password = " password should contain atleast one uppercase";
		}

		return errors;
	};

	const deleteErrorOnFocus = ({ target }) => {
		if (!!inputErrors[target.name]) {
			const errors = { ...inputErrors };
			delete errors[target.name];
			console.log("remove error", errors);
			setInputErrors({ ...errors });
		}
	};

	return (
		<Container fixed>
			<div className="login-screen">
				<Avatar src="/broken-image.jpg" className="avatar-icon" />
				<form autoComplete="off" noValidate>
					<Box width={340} display="flex" flexDirection="column">
						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-email" error={!!inputErrors.email}>
								Email
							</InputLabel>
							<Input
								id="standard-adornment-email"
								className="input-field"
								type="email"
								name="email"
								error={!!inputErrors.email}
								value={values.email}
								onChange={changeEmail}
								aria-describedby="component-error-text"
								onFocus={deleteErrorOnFocus}
								required
							/>
							{!!inputErrors.email ? (
								<FormHelperText id="component-error-text" error>
									{inputErrors.email}
								</FormHelperText>
							) : null}
						</FormControl>

						<FormControl className="form-box">
							<InputLabel htmlFor="standard-adornment-password" error={!!inputErrors.password}>
								Password
							</InputLabel>
							<Input
								id="standard-adornment-password"
								type={values.showPassword ? "text" : "password"}
								error={!!inputErrors.password}
								name="password"
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
								onFocus={deleteErrorOnFocus}
							/>
							{!!inputErrors.password ? (
								<FormHelperText id="component-error-text" error>
									{inputErrors.password}
								</FormHelperText>
							) : null}
						</FormControl>

						<Button type="submit" variant="contained" color="secondary" className="sign-in-btn" onClick={LoginUser}>
							Sign In
						</Button>

						<Typography style={{ color: grey[600] }} paragraph={true}>
							Don't have an account? {"  "}
							<Typography
								component="span"
								display="inline"
								style={{ cursor: "pointer", fontWeight: 900 }}
								color="primary"
								onClick={() => props.history.push("/register")}
							>
								register here
							</Typography>
						</Typography>
					</Box>
				</form>
			</div>
		</Container>
	);
};

export default Login;
