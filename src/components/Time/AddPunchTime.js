import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CreateEntryTime, CreateExitTime } from "../../action/timeAction";

import fingerImg from "../../assets/fingerprint-svgrepo-com.png";
import { monthList } from "../../data";
import { toast } from "react-toastify";

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
		if (props.todayPunch.entry && props.todayPunch.exit) {
			toast.warn("time already punched for today");
			return;
		}

		if (!props.selectedDayId) {
			// creating entry time
			props.Create_Entry_Time(date.getTime());
		} else {
			// creating exit time
			props.Create_Exit_Time(date.getTime());
		}
	};

	return (
		<div className="punch-container">
			<div className="punch-finger-box">
				<img src={fingerImg} alt="finger" onClick={submitTimeOnPunch} />
				<p>&#8211; Punch Now &#8211;</p>
			</div>
			<div className="show-time-box">
				<h6> {`${`0${date.getDate()}`.slice(-2)}-${monthList[date.getMonth()]}-${date.getFullYear()}`}</h6>
				<h4>{date.toLocaleTimeString()}</h4>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedDayId: state.time_store.selectedDayId,
	todayPunch: state.time_store.todayPunch,
});
const mapDispatchToProps = (dispatch) => ({
	Create_Exit_Time: (punchTime) => dispatch(CreateExitTime(punchTime)),
	Create_Entry_Time: (punchTime) => dispatch(CreateEntryTime(punchTime)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowTime);
