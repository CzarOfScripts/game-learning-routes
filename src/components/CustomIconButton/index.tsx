import { Box, BoxProps, SvgIconTypeMap, SxProps, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ICustomIconButtonProps
{
	icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
	size: number;
	sx?: SxProps<Theme>;
}

function CustomIconButton({ className, icon: Icon, size, sx = [], ...props }: ICustomIconButtonProps & BoxProps<"button">)
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
					"&:hover .IconButton-icon":
					{
						color: "#FFFFFF"
					},
					"&:disabled .IconButton-icon":
					{
						cursor: "auto",
						color: "#707070"
					}
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			<Icon className="IconButton-icon" />
		</Box>
	);
}

export default CustomIconButton;
