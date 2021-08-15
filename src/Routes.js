import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import history from "./history";
import Home from "./components/home-screen/Home";
import Login from "./components/auth-screen/Login";
import Register from "./components/auth-screen/Register";

const Routes = (props) => {
	return (
		<Router history={history}>
			<Switch>
				{props.user && props.user.email ? (
					<Route path="/home" component={Home} />
				) : (
					<>
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
					</>
				)}
			</Switch>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth_store.user,
});
export default connect(mapStateToProps)(Routes);
