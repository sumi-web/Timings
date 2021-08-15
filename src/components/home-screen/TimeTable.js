import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Table } from "./HomeStyle";

const TimeTable = (props) => {
	return (
		<>
			<Table className="styled-table" color="secondary">
				<thead>
					<tr>
						<th>Date</th>
						<th>In-Time</th>
						<th>Out-Time</th>
						<th>Hour Done</th>
						<th>Extra Time</th>
					</tr>
				</thead>
				<tbody>
					{props.timeData.map((timeInfo, i) => (
						<WrappedComponent timeInfo={timeInfo} index={i} key={timeInfo.id} isWorkUnderNine={"-" === timeInfo.extraTime.slice(0, 1)} />
					))}
				</tbody>
			</Table>
		</>
	);
};

const mapStateToProps = (state) => ({
	timeData: state.time_store.timeData,
});
export default connect(mapStateToProps)(TimeTable);

const WrappedComponent = ({ timeInfo, index, isWorkUnderNine }) => {
	let inTime = "";
	let outTime = "";

	if (!!timeInfo.entry) {
		const newDate = new Date(timeInfo.entry);
		inTime = newDate.toLocaleTimeString();
	}

	if (!!timeInfo.exit) {
		const newDate = new Date(timeInfo.exit);
		outTime = newDate.toLocaleTimeString();
	}

	return (
		<tr className={(index + 1) % 2 === 0 ? "active-row" : ""}>
			<td>{timeInfo.day}</td>
			<td>{inTime}</td>
			<td>{outTime}</td>
			<td>{timeInfo.hourDone}</td>
			<td style={isWorkUnderNine ? { color: "#F8485E" } : { color: "#93d9a3" }}>{timeInfo.extraTime}</td>
		</tr>
	);
};
