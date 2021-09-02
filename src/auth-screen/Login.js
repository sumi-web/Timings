import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoginUser } from "../action/authAction";
import { Box, Button, FlexBox, FormBox, FullScreenContainer, Image, Input, Label, Span } from "./authStyle";
// import { MdAccountCircle } from "react-icons/md";

const Login = (props) => {
	const [inputValues, setInputValues] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const [inputErrors, setInputErrors] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	const changeEmail = ({ target }) => {
		setInputValues({ ...inputValues, email: target.value });
	};

	const changePassword = ({ target }) => {
		setInputValues({ ...inputValues, password: target.value });
	};

	const togglePasswordVisibility = () => {
		setInputValues({ ...inputValues, showPassword: !inputValues.showPassword });
	};

	const checkForErrorsBeforeSubmit = () => {
		const errors = {};

		const emailRegex = /\S+@\S+\.\S+/;

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

	const deleteErrorOnFocus = ({ target }) => {
		if (!!inputErrors[target.name]) {
			const errors = { ...inputErrors };
			delete errors[target.name];
			console.log("remove error", errors);
			setInputErrors({ ...errors });
		}
	};

	const LoginUser = (e) => {
		e.preventDefault();
		const errors = checkForErrorsBeforeSubmit();
		if (Object.keys(errors).length > 0) {
			setInputErrors({ ...errors });
		} else {
			setIsLoading(true);
			props.Login_User(inputValues).then(() => setIsLoading(false));
		}
	};

	return (
		<FullScreenContainer>
			{/* <MdAccountCircle /> */}
			<Box width="col_4">
				<Image src="https://image.flaticon.com/icons/png/512/847/847969.png" height="120px" mb="small" />
				<form autoComplete="off">
					<FlexBox direction="column" width="col_8">
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
						<Button type="submit" disabled={isLoading} fs="large" color="white" bg="secondary" mt="medium" mb="small" ptb="xsmall" plr="large" br="xxsmall" onClick={LoginUser}>
							{isLoading ? <i className="fa fa-spinner fa-pulse fa-fw"></i> : "Sign In"}
						</Button>
						<Span color={500} fs="small" nestedTagFs="large">
							Don't have an account? <Link to="/register">Register Now</Link>{" "}
						</Span>
					</FlexBox>
				</form>
			</Box>
		</FullScreenContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Login_User: (inputValues) => dispatch(LoginUser(inputValues)),
});
export default connect(null, mapDispatchToProps)(Login);
