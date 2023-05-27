import { Theme } from "@emotion/react";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Box, Checkbox, CheckboxProps, SxProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ReactNode } from "react";

const BpIcon = styled("span")(
	{
		position: "relative",
		borderRadius: "6px",
		width: "20px",
		height: "20px",
		backgroundColor: "#121212"
	}
);

const BpCheckedIcon = styled(({ ...props }: { [ propName: string ]: any; }) =>
{
	return (
		<BpIcon {...props}>
			<DoneRoundedIcon sx={{
				position: "absolute",
				bottom: "0px",
				left: "1px",
				color: "#DC4242",
				transform: "scale(1.2)"
			}} />
		</BpIcon>
	);
})({});

interface ICheckboxStyled
{
	label: ReactNode;
	sx?: SxProps<Theme>;
	checkboxProps?: CheckboxProps;
}

function CheckboxStyled({ label, sx = [], checkboxProps = {}, ...props }: ICheckboxStyled)
{
	const { sx: checkboxSx, ...checkBoxProps } = checkboxProps;

	return (
		<Box
			className="CheckboxStyled-label"
			component="label"
			sx={[
				{
					display: "flex",
					gap: "16px",
					cursor: "pointer"
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			<Checkbox
				className="CheckboxStyled-root"
				disableRipple
				checkedIcon={<BpCheckedIcon className="CheckboxStyled-checkbox CheckboxStyled-checkbox--checked" />}
				icon={<BpIcon className="CheckboxStyled-checkbox" />}
				sx={[
					{
						"&.MuiCheckbox-root":
						{
							padding: "unset"
						}
					},
					...Array.isArray(sx) ? sx : [ sx ]
				]}
				{...checkBoxProps}
			/>

			<Box className="CheckboxStyled-content">{label}</Box>
		</Box>
	);
}

export default CheckboxStyled;
