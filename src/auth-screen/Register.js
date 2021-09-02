import React, { useState } from "react";
import { connect } from "react-redux";

import { RegisterUser } from "../action/authAction";

import { Link } from "react-router-dom";
import { Box, Button, FlexBox, FormBox, FullScreenContainer, Image, Input, Label, Span } from "./authStyle";

const Register = (props) => {
	const [inputValues, setInputValues] = useState({
		name: "",
		imageUrl: "",
		email: "",
		password: "",
		isInputFocused: false,
		showPassword: false,
	});

	const [isLoading, setIsLoading] = useState(false);

	const [inputErrors, setInputErrors] = useState({});

	const changeName = ({ target }) => {
		setInputValues({ ...inputValues, name: target.value });
	};

	const changeEmail = ({ target }) => {
		setInputValues({ ...inputValues, email: target.value });
	};

	const changePassword = ({ target }) => {
		setInputValues({ ...inputValues, password: target.value });
	};

	const togglePasswordVisibility = () => {
		setInputValues({ ...inputValues, showPassword: !inputValues.showPassword });
	};

	const deleteErrorOnFocus = ({ target }) => {
		const error = { ...inputErrors };
		if (!!inputErrors[target.name]) {
			delete error[target.name];
			setInputErrors(error);
		}
	};

	const checkForErrors = () => {
		const errors = { ...inputErrors };
		let someErrorState = false;

		const emailRegex = /\S+@\S+\.\S+/;
		//validation for name
		if (inputValues.name.trim() === "") {
			errors.name = "name can not be empty";
		} else if (inputValues.name.trim().length <= 2) {
			errors.name = "name should contain more than 2 letters";
		}
		//validation for email
		if (inputValues.email.trim() === "") {
			errors.email = "email can not be empty";
		} else if (!emailRegex.test(inputValues.email)) {
			errors.email = "invalid email format";
		}

		//validation for number
		if (inputValues.password.trim() === "") {
			errors.password = "password can not be empty";
		} else if (inputValues.password.trim().length <= 7) {
			errors.password = "password should contain 8 letters atleast";
		} else if (!/[A-Z]/.test(inputValues.password)) {
			errors.password = " password should contain atleast one uppercase";
		}

		return errors;
	};

	const registerUser = (e) => {
		e.preventDefault();
		const errors = checkForErrors();
		if (Object.keys(errors).length > 0) {
			setInputErrors(errors);
		} else {
			setIsLoading(true);
			props.Register_User(inputValues).then(() => setIsLoading(false));
		}
	};

	return (
		<FullScreenContainer>
			<Box width="col_4">
				<Image src="https://image.flaticon.com/icons/png/512/847/847969.png" height="120px" mb="small" />
				<form autoComplete="off">
					<FlexBox direction="column" width="col_8">
						<FormBox error={!!inputErrors.name}>
							<Label
								fs={!!inputValues.name ? "xsmall" : "medium"}
								color={!!inputValues.name ? "secondary" : 400}
								mb="xxsmal"
								position="absolute"
								top={!!inputValues.name ? "15px" : "45px"}
								error={!!inputErrors.name}
							>
								Your Name
							</Label>
							<Input
								type="text"
								name="name"
								value={inputValues.name}
								onChange={changeName}
								onFocus={deleteErrorOnFocus}
								height="35"
								fs="medium"
								bt={!!inputValues.name ? { size: "2px", color: "secondary" } : { size: "2px", color: 300 }}
								color={600}
								error={!!inputErrors.name}
							/>
							{!!inputErrors.name ? (
								<Span fs="small" color="red" pt="xxsmall">
									{inputErrors.name}
								</Span>
							) : null}
						</FormBox>

						<FormBox mb="small" error={!!inputErrors.email}>
							<Label
								fs={!!inputValues.email ? "xsmall" : "medium"}
								color={!!inputValues.email ? "secondary" : 400}
								mb="xxsmal"
								position="absolute"
								top={!!inputValues.email ? "15px" : "45px"}
								error={!!inputErrors.email}
							>
								Email
							</Label>
							<Input
								type="text"
								name="email"
								value={inputValues.email}
								onChange={changeEmail}
								onFocus={deleteErrorOnFocus}
								height="35"
								fs="medium"
								bt={!!inputValues.email ? { size: "2px", color: "secondary" } : { size: "2px", color: 300 }}
								color={600}
								error={!!inputErrors.email}
							/>
							{!!inputErrors.email ? (
								<Span fs="small" color="red" pt="xxsmall">
									{inputErrors.email}
								</Span>
							) : null}
						</FormBox>

						<FormBox mb="small" error={!!inputErrors.password}>
							<Label
								fs={!!inputValues.password ? "xsmall" : "medium"}
								color={!!inputValues.password ? "secondary" : 400}
								mb="xxsmal"
								position="absolute"
								top={!!inputValues.password ? "15px" : "45px"}
								error={!!inputErrors.password}
							>
								Password
							</Label>
							<Input
								type={inputValues.showPassword ? "text" : "password"}
								name="password"
								value={inputValues.password}
								onChange={changePassword}
								onFocus={deleteErrorOnFocus}
								height="35"
								fs="medium"
								bt={!!inputValues.password ? { size: "2px", color: "secondary" } : { size: "2px", color: 300 }}
								color={600}
								error={!!inputErrors.password}
							/>
							<i className={`fa ${inputValues.showPassword ? "fa-eye" : "fa-eye-slash"}`} aria-hidden="true" onClick={togglePasswordVisibility}></i>
							{!!inputErrors.password ? (
								<Span fs="small" color="red" pt="xxsmall">
									{inputErrors.password}
								</Span>
							) : null}
						</FormBox>
						<Button
							type="submit"
							disabled={isLoading}
							fs="large"
							color="white"
							bg="secondary"
							mt="medium"
							mb="small"
							ptb="xsmall"
							plr="large"
							br="xxsmall"
							hoverColor="secondary"
							onClick={registerUser}
						>
							{isLoading ? <i className="fa fa-spinner fa-pulse fa-fw"></i> : "Sign Up"}
						</Button>
						<Span color={500} fs="small" nestedTagFs="large">
							Already have an account? <Link to="/login">Sign In Now</Link>{" "}
						</Span>
					</FlexBox>
				</form>
			</Box>
		</FullScreenContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Register_User: (inputValues) => dispatch(RegisterUser(inputValues)),
});
export default connect(null, mapDispatchToProps)(Register);
