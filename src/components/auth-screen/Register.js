import React, { useState } from "react";
import { Box, FullWidthContainer, Image, Input } from "../html-components/common-components";

const Register = (props) => {
	const [inputValues, setInputValues] = useState({
		name: "",
		imageUrl: "",
		email: "",
		password: "",
		showPassword: false,
	});

	console.log("check", props, inputValues);

	const changeName = ({ target }) => {
		setInputValues({ ...inputValues, name: target.value });
	};

	const changeImageUrl = ({ target }) => {
		setInputValues({ ...inputValues, imageUrl: target.value });
	};

	const changeEmail = ({ target }) => {
		setInputValues({ ...inputValues, email: target.value });
	};

	const changePassword = ({ target }) => {
		setInputValues({ ...inputValues, password: target.value });
	};

	const toggleShowPassword = () => {
		setInputValues({ ...inputValues, showPassword: !inputValues.showPassword });
	};

	return (
		<FullWidthContainer>
			<Box width="33.33%">
				<Image src="https://image.flaticon.com/icons/png/512/847/847969.png" height="120px" />
				<Input type="text" name="name" value={inputValues.name} onChange={changeName} />
				<Input type="text" name="imageUrl" value={inputValues.imageUrl} onChange={changeImageUrl} />
				<Input type="text" name="email" value={inputValues.email} onChange={changeEmail} />
				<Input type="text" name="password" value={inputValues.password} onChange={changePassword} />
			</Box>
		</FullWidthContainer>
		// <Container fixed>
		// 	<div className="login-screen">
		// 		<Avatar src="/broken-image.jpg" className="avatar-icon" />
		// 		<form autoComplete="off">
		// 			<Box width={340} display="flex" flexDirection="column">
		// 				<FormControl className="form-box">
		// 					<InputLabel htmlFor="standard-adornment-email">Name</InputLabel>
		// 					<Input
		// 						id="standard-adornment-email"
		// 						className="input-field"
		// 						type="text"
		// 						name="name"
		// 						value={values.name}
		// 						onChange={changeName}
		// 						required
		// 					/>
		// 				</FormControl>

		// 				<FormControl className="form-box">
		// 					<InputLabel htmlFor="standard-adornment-email">
		// 						Image Url <span style={{ fontSize: "13px" }}>optional*</span>
		// 					</InputLabel>
		// 					<Input
		// 						id="standard-adornment-email"
		// 						className="input-field"
		// 						type="text"
		// 						name="imageUrl"
		// 						value={values.imageUrl}
		// 						onChange={changeImageUrl}
		// 						required
		// 					/>
		// 				</FormControl>

		// 				<FormControl className="form-box">
		// 					<InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
		// 					<Input
		// 						id="standard-adornment-email"
		// 						className="input-field"
		// 						type="email"
		// 						name="email"
		// 						value={values.email}
		// 						onChange={changeEmail}
		// 						required
		// 					/>
		// 				</FormControl>

		// 				<FormControl className="form-box">
		// 					<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
		// 					<Input
		// 						id="standard-adornment-password"
		// 						type={values.showPassword ? "text" : "password"}
		// 						endAdornment={
		// 							<InputAdornment position="end">
		// 								<IconButton
		// 									aria-label="toggle password visibility"
		// 									onClick={toggleShowPassword}
		// 									onMouseDown={(e) => e.preventDefault()}
		// 								>
		// 									{values.showPassword ? <Visibility /> : <VisibilityOff />}
		// 								</IconButton>
		// 							</InputAdornment>
		// 						}
		// 						value={values.password}
		// 						onChange={changePassword}
		// 					/>
		// 				</FormControl>
		// 				<Button type="submit" variant="contained" color="secondary" className="sign-in-btn">
		// 					Sign In
		// 				</Button>

		// 				<Typography style={{ color: grey[600] }} paragraph={true}>
		// 					Don't have an account? {"  "}
		// 					<Typography
		// 						variant="h6"
		// 						display="inline"
		// 						color="primary"
		// 						style={{ cursor: "pointer" }}
		// 						onClick={() => props.history.push("/login")}
		// 					>
		// 						login here
		// 					</Typography>
		// 				</Typography>
		// 			</Box>
		// 		</form>
		// 	</div>
		// </Container>
	);
};

export default Register;
