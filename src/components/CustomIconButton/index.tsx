import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface ICustomIconButtonProps
{
	children: ReactNode;
	size: number;
	sx?: SxProps<Theme>;
}

function CustomIconButton({ className, children, size, sx = [], ...props }: ICustomIconButtonProps & BoxProps<"button">)
{
	return (
		<Box
			className={"IconButton-root " + className}
			component="button"
			sx={[
				{
					border: "unset",
					background: "unset",
					height: size + "px",
					width: size + "px",

					"& svg":
					{
						fontSize: size + "px",
						color: "#ACACAC",
						transition: "linear 200ms color"
					},
					"&:hover svg":
					{
						color: "#FFFFFF"
					},
					"&:disabled svg":
					{
						cursor: "auto",
						color: "#707070"
					}
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			{children}
		</Box>
	);
}

export default CustomIconButton;
