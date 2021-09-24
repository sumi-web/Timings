import React from "react";
import { connect } from "react-redux";
import { LogOutUser } from "../action/authAction";

import AddPunchTime from "./AddPunchTime";
import EnterPunchTime from "./EnterPunchTime";

const LeftSection = (props) => {
	return (
		<>
			<div id="bio-box">
				<div className="bio-info">
					<i class="fa fa-cog" aria-hidden="true"></i>
					{/* <img src="" alt="" /> */}
					<div className="avatar-box">{props.user.name.slice(0, 1)}</div>

					<h4>{props.user.name.toUpperCase() || ""}</h4>
					<p>{props.user.email || ""}</p>
				</div>
			</div>

			<div id="punch-box">
				<AddPunchTime />
			</div>

			<EnterPunchTime />
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth_store.user,
});
const mapDispatchToProps = (dispatch) => ({
	Log_Out_User: () => dispatch(LogOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LeftSection);
