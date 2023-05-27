import { Box, BoxProps } from "@mui/material";

function Wrapper({ children, sx = [], ...props }: BoxProps)
{
	return (
		<Box
			className="Wrapper"
			sx={[
				{
					width: "100%",
					maxWidth: "300px",
					margin: "0 auto",
					height: "100%"
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			{children}
		</Box>
	);
}

export default Wrapper;
