import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, DialogProps, alpha } from "@mui/material";
import CustomIconButton from "components/CustomIconButton";
import { TransitionSlideDown, TransitionSlideLeft, TransitionSlideRight, TransitionSlideUp } from "components/Transition";
import Wrapper from "components/Wrapper";
import { ReactNode } from "react";

export interface IDialogStyledProps extends Omit<DialogProps, "open" | "title">
{
	readonly title: ReactNode;
	/**
	 * @default "down"
	 */
	readonly children: ReactNode;
	readonly transitionDirection?: keyof typeof TRANSITION;
	/**
	 * @default false
	 */
	readonly open?: boolean;
	onClose(event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButton"): void;
}

const TRANSITION = {
	up: TransitionSlideUp,
	down: TransitionSlideDown,
	right: TransitionSlideRight,
	left: TransitionSlideLeft
} as const;

function DialogStyled({ title, children, transitionDirection = "down", open = false, onClose, sx = [], ...props }: IDialogStyledProps)
{
	return (
		<Dialog
			open={open}
			onClose={onClose}
			TransitionComponent={TRANSITION[ transitionDirection ]}
			sx={[
				{
					"& .MuiDialog-container":
					{
						backdropFilter: "blur(3px)",
						alignItems: "flex-start"
					},
					"& .MuiPaper-root":
					{
						overflow: "hidden",
						background: "unset",
						borderRadius: "16px",
						maxWidth: "300px",
						width: "100%",
						color: "unset"
					},
					"& .Wrapper":
					{
						width: "100%",
						borderRadius: "16px",
						backdropFilter: "blur(10px)",
						backgroundColor: alpha("#252525", 0.85)
					},
					"& .Dialog-header":
					{
						padding: "24px 24px 16px 24px",
						display: "flex",
						alignItems: "center",
						gap: "24px",
						borderBottom: "2px solid " + alpha("#707070", 0.4)
					},
					"& .Dialog-title":
					{
						fontWeight: "700",
						flexGrow: 1,
						color: "#FFFFFF"
					},
					"& .Dialog-closeButton svg":
					{
						fontSize: "24px",
						color: "#ACACAC"
					},
					"& .Dialog-content":
					{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						padding: "16px 24px 24px 24px"
					}
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			<Wrapper>
				<Box className="Dialog-header">
					<Box className="Dialog-title">
						{title}
					</Box>

					<CustomIconButton
						className="Dialog-closeButton"
						icon={CloseRoundedIcon}
						size={24}
						onClick={(event) => onClose(event, "closeButton")}
					/>
				</Box>

				<Box className="Dialog-content">
					{children}
				</Box>
			</Wrapper>
		</Dialog>
	);
}

export default DialogStyled;
