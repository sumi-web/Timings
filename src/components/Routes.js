import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import loadingScreen from "./loading-screen/loadingScreen";
import Login from "./Login";
import Register from "./Register";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={loadingScreen} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/home" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
