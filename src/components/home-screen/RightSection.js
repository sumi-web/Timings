import React from "react";
import { Box, Center, TimeContainer } from "./HomeStyle";
import TimeTable from "./TimeTable";

const RightSection = () => {
	return (
		<>
			<Box width="col_12">
				<Center direction="row" jc="space-around" width="col_12">
					<TimeContainer width="col_4" bc="secondary" shadow={1}>
						yesterday punch
					</TimeContainer>
					<TimeContainer width="col_4" bc="secondary" shadow={1}>
						today punch
					</TimeContainer>
				</Center>
			</Box>
			<Box width="col_8" mtb="none">
				bar about time users data
			</Box>
			<TimeTable />
		</>
	);
};

export default RightSection;
