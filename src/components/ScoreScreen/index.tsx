import HomeIcon from "@mui/icons-material/Home";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Box, CircularProgress } from "@mui/material";
import { AppContext } from "App";
import { useContext } from "react";

function ScoreScreen()
{
	const AppCtx = useContext(AppContext);

	const percentage = Math.floor((AppCtx.result![ 0 ] * 100) / AppCtx.result![ 1 ]);

	// Utils
	function textByPercentage(percentage: number)
	{
		const arr: [ number, string ][] = [
			[ 15, "Плохо :(" ],
			[ 40, "Не плохо, но можешь и лучше" ],
			[ 65, "Нормально, есть к чему стремиться" ],
			[ 85, "Хорошо! Поднажми!" ],
			[ 100, "Отлично! Ты молодец :)" ],
		];

		for (const index in arr)
		{
			if (percentage < (arr[ index ][ 0 ]))
			{
				return arr[ index ][ 1 ];
			}
		}

		return "Ого! Все ответы правильные? Сможешь повторить?";
	}

	function colorByPercentage(percentage: number)
	{
		const arr: [ number, string ][] = [
			[ 15, "#DC4242" ],
			[ 40, "#e5880d" ],
			[ 65, "#f9f339" ],
			[ 85, "#68f1fd" ]
		];

		for (const index in arr)
		{
			if (percentage < (arr[ index ][ 0 ]))
			{
				return arr[ index ][ 1 ];
			}
		}

		return "#40c62f";
	}

	// Render
	return (
		<Box
			className="ScoreScreen"
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				height: "100%"
			}}
		>
			<Box sx={{ textAlign: "center", font: "400 24px/28px Consolas" }}>
				{textByPercentage(percentage)}
			</Box>

			<Box sx={{
				position: "relative",
				border: "3px solid #252525",
				width: "150px",
				height: "150px",
				borderRadius: "50%",
				margin: "auto",
				lineHeight: "96px",
				textAlign: "center",
				font: "400 24px/144px Consolas"
			}}>
				<CircularProgress
					variant="determinate"
					size={150}
					value={percentage}
					thickness={3}
					sx={{
						position: "absolute",
						left: "-3px",
						top: "-3px",
						color: colorByPercentage(percentage)
					}}
				/>
				<span style={{ color: colorByPercentage(percentage) }}>{AppCtx.result![ 0 ]}</span>/{AppCtx.result![ 1 ]}
			</Box>

			{/* <input type="range" min="0" max={result[ 1 ]} defaultValue="0" onChange={({ target }) => setValue(target.valueAsNumber)} /> */}

			<Box sx={{
				marginTop: "auto",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "24px",

				"> button":
				{
					display: "flex",
					flexDirection: "column",
					border: "unset",
					background: "unset"
				}
			}}>
				<button
					onClick={() =>
					{
						AppCtx.setSelectedCity(null);
						AppCtx.setIsShowResult(false);
					}}
				>
					<HomeIcon sx={{ fontSize: "56px" }} />
				</button>

				<button
					onClick={() =>
					{
						AppCtx.setResult((prevState) =>
						{
							return Object.assign([], prevState, { 0: 0 });
						});
						AppCtx.setIsShowResult(false);
					}}
				>
					<RepeatIcon sx={{ fontSize: "56px" }} />
				</button>
			</Box>
		</Box>
	);
}

export default ScoreScreen;
