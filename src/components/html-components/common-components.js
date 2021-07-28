import styled from "@emotion/styled";

export const FullWidthContainer = styled.div(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	color: theme.colors.primary,
	width: "100%",
	height: "100vh",
}));

export const Box = styled.div(({ width }) => ({
	width: `${width}`,
}));

export const Image = styled.img(({ height }) => ({
	display: "block",
	objectFit: "contain",
	height: `${height}`,
	margin: "0  auto",
}));

export const Input = styled.input(() => ({
	outline: "none",
}));
