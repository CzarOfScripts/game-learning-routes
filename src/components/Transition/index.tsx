import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement } from "react";

export const TransitionSlideUp = forwardRef((
	props: TransitionProps & { children: ReactElement<any, any>; },
	ref: React.Ref<unknown>,
) =>
{
	return <Slide direction="up" timeout={500} ref={ref} {...props} />;
});

export const TransitionSlideDown = forwardRef((
	props: TransitionProps & { children: ReactElement<any, any>; },
	ref: React.Ref<unknown>,
) =>
{
	return <Slide direction="down" timeout={500} ref={ref} {...props} />;
});

export const TransitionSlideRight = forwardRef((
	props: TransitionProps & { children: ReactElement<any, any>; },
	ref: React.Ref<unknown>,
) =>
{
	return <Slide direction="right" timeout={500} ref={ref} {...props} />;
});

export const TransitionSlideLeft = forwardRef((
	props: TransitionProps & { children: ReactElement<any, any>; },
	ref: React.Ref<unknown>,
) =>
{
	return <Slide direction="left" timeout={500} ref={ref} {...props} />;
});
