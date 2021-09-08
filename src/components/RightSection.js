import React, { useRef } from "react";
import { connect } from "react-redux";

import TimeTable from "../components/TimeTable";

import { monthList } from "../data";

const RightSection = (props) => {
	const date_ref = useRef(new Date());

	return (
		<>
			<div className="time-info-box">
				<div className="time-container">
					<h3>Yesterday Punch</h3>
					<div className="timing-details">
						<div>
							<p className="time-title">Enter Time</p>
							<p className="time-info">{props.yesterdayPunch.entry}</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{props.yesterdayPunch.exit}</p>
						</div>
					</div>
				</div>

				<div className="time-container center">
					<h3>{monthList[date_ref.current.getMonth()]} Update</h3>
					<div className="timing-details">
						<div>
							<p className="timing-title">Total hour</p>
							<p className="time-info">{props.totalHour}:HH</p>
						</div>
						<div>
							<p className="timing-title">Work Till Now</p>
							<p className="time-info">{`${props.hourWork}:${props.minWork}`}</p>
						</div>
					</div>
				</div>

				<div className="time-container">
					<h3>Today Punch</h3>
					<div className="timing-details">
						<div>
							<p className="time-title">Enter Time</p>
							<p className="time-info">{props.todayPunch.entry}</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{props.todayPunch.exit}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="graph-data-box">
				<p>user graph data here </p>
			</div>

			<div className="time-filter-header">
				<select>
					<option value="current-month">Current Month</option>
					<option value="current-month">Last Month</option>
				</select>
				<select>
					<option value="random">All</option>
					<option value="random">Absent</option>
					<option value="random">less</option>
					<option value="random">more</option>
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
});
export default connect(mapStateToProps)(RightSection);