import styled from "@emotion/styled";
import { Button } from "@mui/material";

const ButtonStyled = styled(Button)(({ disabled }) =>
({
	color: (disabled === true ? "#ACACAC" : "#FFFFFF") + "!important",
	backgroundColor: (disabled === true ? "#151515" : "#252525") + "!important",
	font: "400 20px/23px Consolas",
	textTransform: "none",
	overflow: "hidden",
	clipPath: "polygon(calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0 0)",
	height: "50px",
	minHeight: "unset",
	maxHeight: "unset",
	borderRadius: "10px",
	transition: "linear 200ms background-color",

	"&:focus":
	{
		backgroundColor: (disabled === true ? "#151515" : "#252525")
	}
})
);

export default ButtonStyled;
