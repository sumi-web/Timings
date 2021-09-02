import styled from "@emotion/styled";

export const FullScreenContainer = styled.div(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	color: theme.colors.primary,
	width: "100%",
	height: "100vh",
}));

//#region form related component
export const FormBox = styled.div(({ mb, theme, error }) => ({
	position: "relative",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	margin: `0 0 0 0`,
	[`&:focus-within`]: {
		[`&>Label`]: {
			top: "15px",
			color: `${error ? theme.colors.red : theme.colors.primary}`,
			fontSize: "0.79rem",
		},
	},
	[`&> i.fa`]: {
		position: "absolute",
		bottom: `${error ? "32px" : "10px"}`,
		right: "5%",
		color: `${theme.colors.primary}`,
		cursor: "pointer",
		zIndex: "2",
		fontSize: "1.2rem",
	},
}));
export const Label = styled.label(({ fs, color, theme, position, top, error }) => ({
	fontSize: `${theme.fontSize[fs]}`,
	color: `${error ? theme.colors.red : theme.colors[color]}`,
	position: `${position && position}`,
	top: top,
	left: "4px",
	transition: "all 0.2s ease-in-out",
}));

export const Input = styled.input(({ height, theme, fs, bt, color, error }) => ({
	fontSize: `${theme.fontSize[fs]}`,
	color: `${theme.colors[color]}`,
	borderBottom: `${error ? `2px solid ${theme.colors.red}` : `${bt.size} solid ${theme.colors[bt.color]}`}`,
	height: `${height}px`,
	zIndex: "1",
	background: "none",
	transition: "all 0.4s linear",
	padding: "35px 0 0 5px",
	[`&:focus`]: {
		borderBottomColor: `${error ? theme.colors.red : theme.colors.secondary}`,
	},
}));

//#endregion

export const FlexBox = styled.div(({ direction, width, theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: `${direction}`,
	justifyContent: "center",
	alignItems: "center",
	width: `${theme.widthSize[width]}`,
	margin: "0 auto",
}));

export const Box = styled.div(({ theme, width }) => ({
	width: `${theme.widthSize[width]}`,
}));

export const Image = styled.img(({ height, theme }) => ({
	display: "block",
	objectFit: "contain",
	height: `${height}`,
	margin: "0  auto",
}));

export const Button = styled.button(({ theme, fs, bg, mt, mb, color, ptb, plr, br, hoverColor }) => ({
	display: "block",
	color: `${theme.colors[color]}`,
	borderRadius: `${theme.spacing[br]}`,
	fontSize: `${theme.fontSize[fs]}`,
	backgroundColor: `${theme.colors[bg]}`,
	padding: `${theme.spacing[ptb]} ${theme.spacing[plr]}`,
	margin: `${theme.spacing[mt]} 0 ${theme.spacing[mb]} 0`,
	transition: "all 0.2s linear",
	[`&:hover`]: {
		backgroundColor: `${LightenDarkenColor(theme.colors[hoverColor], -15)}`,
	},
	[`&:focus`]: {
		backgroundColor: `${LightenDarkenColor(theme.colors[hoverColor], -20)}`,
	},
	[`&:active`]: {
		transform: "scale(0.98)",
	},

	[`&:disabled`]: {
		opacity: "0.7",
	},
}));

export const Span = styled.span(({ theme, color, fs, nestedTagFs, pt }) => ({
	color: `${theme.colors[color]}`,
	fontSize: `${theme.fontSize[fs]}`,
	margin: 0,
	padding: `${theme.spacing[pt]} 0 0 0 `,
	[`&> a`]: {
		color: `${theme.colors.primary}`,
		fontSize: `${theme.fontSize[nestedTagFs]}`,
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
