import React from "react";
import { connect } from "react-redux";

import TimeTable from "../components/TimeTable";

const RightSection = (props) => {
	return (
		<>
			<div className="time-info-box">
				<div className="time-container">
					<h3>Yesterday Punch</h3>
					<div className="timing-details">
						<div>
							<p className="time-title">Enter Time</p>
							<p className="time-info">{props.totalHour}:HH</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{`${props.hourWork}:${props.minWork}`}</p>
						</div>
					</div>
				</div>

				<div className="time-container center">
					<h3>August Update</h3>
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
							<p className="time-info">{props.totalHour}:HH</p>
						</div>
						<div>
							<p className="time-title">Exit Time</p>
							<p className="time-info">{`${props.hourWork}:${props.minWork}`}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="graph-data-box">
				<p>user graph data here </p>
			</div>
			<div id="time-table-box">
				<TimeTable />
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	totalHour: state.time_store.totalHour,
	hourWork: state.time_store.totalWorkDone?.hour ?? "",
	minWork: state.time_store.totalWorkDone?.min ?? "",
});
export default connect(mapStateToProps)(RightSection);
