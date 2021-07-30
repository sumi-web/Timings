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

//#region  form related component
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
	padding: "25px 0 0 5px",
	[`&:focus`]: {
		borderBottomColor: `${error ? theme.colors.red : theme.colors.secondary}`,
	},
}));

//#endregion
export const FormBox = styled.div(({ mb, theme, error }) => ({
	position: "relative",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	margin: `0 0 ${theme.spacing[mb]} 0`,
	[`&:focus-within`]: {
		[`&>Label`]: {
			top: "5px",
			color: `${error ? theme.colors.red : theme.colors.primary}`,
			fontSize: "0.79rem",
		},
	},
}));

export const FlexBox = styled.div(({ direction, width, theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: `${direction}`,
	justifyContent: "center",
	alignItems: "center",
	width: `${theme.widthSize[width]}`,
	margin: "0 auto",
}));

export const Box = styled.div(({ width }) => ({
	width: `${width}`,
}));

export const Image = styled.img(({ height, theme }) => ({
	display: "block",
	objectFit: "contain",
	height: `${height}`,
	margin: "0  auto",
}));

export const Button = styled.button(({ theme, fs, bg, mt, mb, color, ptb, plr, br }) => ({
	display: "block",
	color: `${theme.colors[color]}`,
	borderRadius: `${theme.spacing[br]}`,
	fontSize: `${theme.fontSize[fs]}`,
	backgroundColor: `${theme.colors[bg]}`,
	padding: `${theme.spacing[ptb]} ${theme.spacing[plr]}`,
	margin: `${theme.spacing[mt]} 0 ${theme.spacing[mb]} 0`,
}));

export const Span = styled.span(({ theme, color, fs, nestedTagFs }) => ({
	color: `${theme.colors[color]}`,
	fontSize: `${theme.fontSize[fs]}`,
	margin: 0,
	padding: 0,
	[`&> a`]: {
		color: `${theme.colors.primary}`,
		fontSize: `${theme.fontSize[nestedTagFs]}`,
	},
}));
