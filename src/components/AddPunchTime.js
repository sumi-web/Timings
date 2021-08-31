import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CreateEntryAndExitTime } from "../action/timeAction";

import fingerImg from "../assets/fingerprint-svgrepo-com.png";

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ShowTime = (props) => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const submitTimeOnPunch = () => {
		props.Create_Entry_And_Exit_Time(date.getTime());
	};

	return (
		<div className="punch-container">
			<div className="punch-finger-box">
				<img src={fingerImg} alt="finger" onClick={submitTimeOnPunch} />
				<p>&#8211; Punch Now &#8211;</p>
			</div>
			<div className="show-time-box">
				<h6> {`${String(date.getDate()).length === 1 ? "0" + date.getDate() : date.getDate()}-${monthList[date.getMonth()]}-${date.getFullYear()}`}</h6>
				<h4>{date.toLocaleTimeString()}</h4>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Create_Entry_And_Exit_Time: (punchType) => dispatch(CreateEntryAndExitTime(punchType, "")),
});
export default connect(null, mapDispatchToProps)(ShowTime);
