import React from "react";
import { connect } from "react-redux";
import { LogOutUser } from "../action/authAction";

import { Button } from "./html-components/common-components";

const Home = (props) => {
	return <Button onClick={() => props.Log_Out_User()}>log out </Button>;
};

const mapDispatchToProps = (dispatch) => ({
	Log_Out_User: () => dispatch(LogOutUser()),
});
export default connect(null, mapDispatchToProps)(Home);
