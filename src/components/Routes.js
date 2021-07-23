import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import history from "../history";
import Home from "./Home";
import loadingScreen from "./loading-screen/loadingScreen";
import Login from "./login-screen/Login";
import Register from "./Register";

const Routes = ({ userData }) => {
	return (
		<Router history={history}>
			<Switch>
				{userData === null ? (
					<Route exact path="/" component={loadingScreen} />
				) : !!userData && userData.name ? (
					<Route path="/home" component={Home} />
				) : (
					<Route path="/login" component={Login} />
				)}
				<Route path="/register" component={Register} />
			</Switch>
		</Router>
	);
};

export default Routes;
