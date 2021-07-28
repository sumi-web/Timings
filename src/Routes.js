import React, { useContext } from "react";
import { Switch, Route, Router } from "react-router-dom";
import history from "./history";
import Home from "./components/Home";
import loadingScreen from "./components/loading-screen/loadingScreen";
import Login from "./components/auth-screen/Login";
import Register from "./components/auth-screen/Register";
import { UserContext } from "./App";

const Routes = () => {
	const userCredentials = useContext(UserContext);

	return (
		<Router history={history}>
			<Switch>
				{userCredentials.user === null ? (
					<Route exact path="/" component={loadingScreen} />
				) : !!userCredentials.user && userCredentials.user.name ? (
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

export default Routes;
