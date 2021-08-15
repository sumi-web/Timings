import styled from "@emotion/styled";

export const Box = styled.div(({ theme, width, flexWidth, height, direction, js, ai, mtb, bg }) => ({
	width: `${theme.widthSize[width]}`,
	display: "flex",
	flex: `${flexWidth}`,
	height: `${height ? height : "auto"}`,
	flexDirection: `${direction}`,
	justifyContent: `${js}`,
	alignItems: `${ai}`,
	margin: `${theme.spacing[mtb]} auto`,
	backgroundColor: `${theme.colors[bg]}`,
}));

export const Center = styled.div(({ theme, direction, jc, width }) => ({
	display: "flex",
	flexDirection: `${direction}`,
	justifyContent: `${jc}`,
	alignItems: "center",
	width: `${width ? theme.widthSize[width] : "auto"}`,
}));

export const H1 = styled.h1(({ theme, color, fs }) => ({
	fontSize: `${theme.fontSize[fs]}`,
	color: `${theme.colors[color]}`,
	margin: "0",
}));

export const H2 = styled.h2(({ theme, fs, color }) => ({
	fontSize: `${theme.fontSize[fs]}`,
	color: `${theme.colors[color]}`,
	margin: "0",
}));

export const H3 = styled.h3(({ theme, color, fs }) => ({
	color: `${theme.colors[color]}`,
	fontSize: "",
	textAlign: "center",
	margin: "0",
}));
export const P = styled.p(({ theme, fs, color }) => ({
	fontSize: "",
	color: "",
}));

export const Span = styled.span(({ theme, fs, color, fw, mb }) => ({
	color: `${theme.colors[color]}`,
	fontSize: `${theme.fontSize[fs]}`,
	fontWeight: `${fw ? fw : "400"}`,
	margin: `0 0 ${theme.spacing[mb]} 0`,
}));

export const Button = styled.button(({ theme, color, bg, fs, width, ptb, plr, br, shadow, mt }) => ({
	backgroundColor: `${theme.colors[bg]}`,
	fontSize: `${theme.fontSize[fs]}`,
	color: `${theme.colors[color]}`,
	width: `${theme.widthSize[width]}`,
	padding: `${theme.spacing[ptb]} ${theme.spacing[plr]}`,
	borderRadius: `${theme.spacing[br]}`,
	boxShadow: `${shadow ? shadow : "none"}`,
	margin: `${theme.spacing[mt]} 0 0 0`,
	[`&:hover`]: {
		backgroundColor: `${LightenDarkenColor(theme.colors[bg], -15)}`,
	},
	[`&:focus`]: {
		backgroundColor: `${LightenDarkenColor(theme.colors[bg], -20)}`,
	},
	[`&:active`]: {
		transform: "scale(0.98)",
	},
}));

export const TimeContainer = styled.div(({ theme, width, bc, shadow }) => ({
	width: `${theme.widthSize[width]}`,
	margin: "20px 0",
	border: `1px solid ${theme.colors[bc]}`,
	borderRadius: "10px",
	boxShadow: `${theme.shadow[shadow]}`,
	backgroundColor: "#fff",
}));

export const Table = styled.table(({ theme, color }) => ({
	borderCollapse: "collapse",
	margin: "5px 0",
	fontSize: "1rem",
	width: "100%",
	backgroundColor: "#fff",
	padding: "0 10px",
	boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
	overflowY: "scroll",
	[`& > thead > tr`]: {
		backgroundColor: `${theme.colors[color]}`,
		color: "#fff",
		textAlign: "left",
	},

	[`& > thead > tr > th`]: {
		padding: "10px 13px",
	},
	[`& > tbody > tr > td`]: {
		padding: "10px 13px",
	},

	[`& > tbody > tr`]: {
		borderBottom: "1px solid #dddddd",
		padding: "20px 0",
		height: "40px",
	},

	[`& > tbody > tr:nth-of-type(even)`]: {
		backgroundColor: "#f3f3f3",
	},

	[`& > tbody > tr:last-of-type`]: {
		borderBottom: "2px solid" + theme.colors[color],
	},

	[`& > tbody > tr.active-row`]: {
		fontWeight: "bold",
		color: `${theme.colors[color]}`,
	},
}));

//for converting dark or light color
function LightenDarkenColor(col, amt) {
	if (col) {
		let usePound = false;

		if (col[0] === "#") {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00ff) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000ff) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
	}
}
