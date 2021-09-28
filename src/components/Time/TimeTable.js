import React, { useState } from "react";
import { connect } from "react-redux";
import { EditPunchedTimeData } from "../../action/timeAction";
import EditPunchedTime from "./EditPunchedTime";

const TimeTable = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (id) => {
		props.Edit_Punched_Time_Data(id);
		setIsOpen(true);
	};

	const closeModal = () => [setIsOpen(false)];

	return (
		<>
			<table className="styled-table" color="secondary">
				<thead>
					<tr>
						<th>Date</th>
						<th>In-Time</th>
						<th>Out-Time</th>
						<th>Hour Done</th>
						<th>Extra Time</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{props.timeData.map((timeInfo, i) => (
						<WrappedComponent timeInfo={timeInfo} index={i} key={timeInfo.id} openModal={openModal} />
					))}
				</tbody>
			</table>
			<EditPunchedTime isOpen={isOpen} closeModal={closeModal} />
		</>
	);
};

const mapStateToProps = (state) => ({
	timeData: state.time_store.timeData,
});
const mapDispatchToProps = (dispatch) => ({
	Edit_Punched_Time_Data: (id) => dispatch(EditPunchedTimeData(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);

const WrappedComponent = ({ timeInfo, index, openModal }) => {
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
			<td
				style={
					timeInfo.extraTime.slice(0, 1) === "+" ? { color: "#8cc152" } : timeInfo.extraTime.slice(0, 1) === "-" ? { color: "#ff0000" } : { color: "#a03c78" }
				}
			>
				{timeInfo.extraTime}
			</td>
			<td className="edit-icon">
				<i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => openModal(timeInfo.id)}></i>
			</td>
		</tr>
	);
};
