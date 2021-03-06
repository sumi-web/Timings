import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import TimeTable from "./TimeTable";

import { monthList, sortAbsent, sortMonth } from "../../data";

const RightSection = (props) => {
	const date_ref = useRef(new Date());

	// const [] = useState();

	return (
		<>
			<div className="time-info-box">
				<div className="time-container">
					<h3>Yesterday Punch</h3>
					<div className="timing-details">
						<div>
							<p className="time-title">Enter Time</p>
							<p className="time-info">{props.yesterdayPunch.entry || "00:00:00"}</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{props.yesterdayPunch.exit || "00:00:00"}</p>
						</div>
					</div>
				</div>

				<div className="time-container center">
					<h3>{monthList[date_ref.current.getMonth()]} Update</h3>
					<div className="timing-details">
						<div>
							<p className="timing-title">Total hour</p>
							<p className="time-info">{props.totalHour}:00 HH</p>
						</div>
						<div>
							<p className="timing-title">Work Till Now</p>
							<p className="time-info">{`${props.hourWork}:${props.minWork}:${props.secWork}`}HH</p>
						</div>
					</div>
				</div>

				<div className="time-container">
					<h3>Today Punch</h3>
					<div className="timing-details">
						<div>
							<p className="time-title">Enter Time</p>
							<p className="time-info">{props.todayPunch.entry || "00:00:00"}</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{props.todayPunch.exit || "00:00:00"}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="time-filter-header">
				<select>
					{sortMonth.map((option) => (
						<option key={option.id} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				<select>
					{sortAbsent.map((option) => (
						<option key={option.id} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
			</div>
			<div id="time-table-box">
				<TimeTable />
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	totalHour: state.time_store.totalHour,
	todayPunch: state.time_store.todayPunch,
	yesterdayPunch: state.time_store.yesterdayPunch,
	minWork: state.time_store.totalWorkDone?.min ?? "",
	hourWork: state.time_store.totalWorkDone?.hour ?? "",
	secWork: state.time_store.totalWorkDone?.sec ?? "",
});
export default connect(mapStateToProps)(RightSection);
