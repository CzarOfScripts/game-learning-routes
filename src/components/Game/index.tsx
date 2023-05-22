import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from "@mui/icons-material/Home";
import { Box, CircularProgress, Zoom, alpha } from "@mui/material";
import { AppContext } from "App";
import ButtonStyled from "components/ButtonStyled";
import { CitiesNameType, data, getCityImage } from "data/data";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { getRandomItem, shuffleArray } from "utils";

enum GameType
{
	ONE_CORRECT,
	ONE_WRONG
};

type QuestionType = {
	answers: { city: string, area: string; }[],
	answer: string,
	gameType: GameType;
};

const AUTO_NEXT_QUESTION_TIME: number = 3500;

function Game()
{
	const AppCtx = useContext(AppContext);

	const city = AppCtx.selectedCity as CitiesNameType;

	const timerIdRef = useRef<NodeJS.Timeout>();
	const [ selectedAnswer, setSelectedAnswer ] = useState<string | null>(null);
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState<number>(0);
	const [ questions ] = useState<QuestionType[]>(() =>
	{
		const array: QuestionType[] = [];
		const areasCount = data[ city ].areas.length;

		for (let i = 0; i < areasCount; i++)
		{
			array.push(createQuestion(data[ city ].areas[ i ], Math.round(Math.random())));
		}

		shuffleArray(array);

		return array;
	});

	const currentQuestion = questions[ currentQuestionIndex ];

	// Effects
	useLayoutEffect(() =>
	{
		AppCtx.setResult((prevState) =>
		{
			return Object.assign([], prevState, { 1: questions.length });
		});
	}, []); // eslint-disable-line

	// Utils
	function getRandomCity(withoutCity: CitiesNameType): CitiesNameType
	{
		const cities = Object
			.keys(data)
			.filter((city) => city !== withoutCity) as CitiesNameType[];

		return getRandomItem(cities);
	}

	function getRandomArea(city: CitiesNameType, withoutArea: string | null = null): string
	{
		if (withoutArea === null)
		{
			return getRandomItem(data[ city ].areas);
		}

		const areas = data[ city ].areas
			.filter((area) => area !== withoutArea);

		return getRandomItem(areas);
	}

	function createQuestion(area: string, gameType: GameType): QuestionType
	{
		switch (gameType)
		{
			case GameType.ONE_CORRECT: {

				const city1 = getRandomCity(city);
				const city2 = getRandomCity(city);
				const area1 = getRandomArea(city1);
				const area2 = getRandomArea(city2, area1);

				const answers = [
					{ city: city, area: area },
					{ city: city1, area: area1 },
					{ city: city2, area: area2 }
				];

				shuffleArray(answers);

				return {
					answers,
					answer: area,
					gameType
				};
			}
			case GameType.ONE_WRONG: {
				const badCity = getRandomCity(city);
				const badArea = getRandomArea(badCity);

				const answers = [
					{ city, area },
					{ city, area: getRandomArea(city, area) },
					{ city: badCity, area: badArea }
				];

				shuffleArray(answers);

				return {
					answers,
					answer: badArea,
					gameType
				};
			}
		}
	}

	function isCorrectAnswer(value: string): 1 | 0 | -1
	{
		if (selectedAnswer === null)
		{
			return -1;
		}

		if (value === currentQuestion.answer)
		{
			return 1;
		}

		return value === selectedAnswer ? 0 : -1;
	}

	// Handles
	function selectAnswer(value: string)
	{
		if (selectedAnswer !== null)
		{
			return;
		}

		setSelectedAnswer(value);

		clearTimeout(timerIdRef.current);
		timerIdRef.current = setTimeout(nextQuestion, AUTO_NEXT_QUESTION_TIME);
	}

	function nextQuestion()
	{
		clearTimeout(timerIdRef.current);

		if (selectedAnswer === currentQuestion.answer)
		{
			AppCtx.setResult((prevState) =>
			{
				return Object.assign([], prevState, { 0: prevState[ 0 ] + 1 });
			});
		}

		if (currentQuestionIndex === questions.length - 1)
		{
			AppCtx.setIsShowResult(true);

			return;
		}

		setCurrentQuestionIndex((prevState) => prevState + 1);
		setSelectedAnswer(null);
	}

	// Render
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			gap: "24px",
			height: "100%"
		}}>
			<Box sx={{
				position: "relative",
				width: "300px",
				height: "100px",
				borderRadius: "15px",
				overflow: "hidden",
				background: `url(${ getCityImage(AppCtx.selectedCity) }) bottom center/cover`,
				objectFit: "cover",
				margin: "0 auto"
			}}>
				<Box sx={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: alpha("#000000", 0.5),
					color: "#FFFFFF",
					font: "400 36px/42px Consolas"
				}}>
					{AppCtx.selectedCity}
				</Box>
			</Box>

			<Box sx={{
				font: "400 20px/23px Consolas",
				textAlign: "center",
				color: "#FFFFFF"
			}}>
				{currentQuestion!.gameType === GameType.ONE_CORRECT
					? <>Выберите правильный район</>
					: <>Выберите <i style={{ fontStyle: "italic" }}>НЕправильный</i> район</>
				}
			</Box>

			<Box sx={{
				marginTop: "16px",
				display: "flex",
				flexDirection: "column",
				gap: "24px",

				"& button.answer--false":
				{
					backgroundColor: "#B13232 !important",
					textShadow: "2px 2px #000"
				},
				"& button.answer--true":
				{
					backgroundColor: "#17720B !important",
					textShadow: "2px 2px #000"
				}
			}}>
				{[ 0, 1, 2 ].map((index) =>
				{
					return (
						<ButtonStyled
							key={index}
							disableRipple
							disableFocusRipple
							disableTouchRipple
							onClick={() => selectAnswer(currentQuestion!.answers[ index ].area)}
							className={
								isCorrectAnswer(currentQuestion!.answers[ index ].area) === 1
									? "answer--true"
									: isCorrectAnswer(currentQuestion!.answers[ index ].area) === 0
										? "answer--false"
										: ""
							}
							sx={{ flexDirection: "column" }}
						>
							{currentQuestion!.answers[ index ].area}
							{selectedAnswer !== null &&
								(
									<Zoom in={true} timeout={350}>
										<span style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>({currentQuestion!.answers[ index ].city})</span>
									</Zoom>
								)
							}
						</ButtonStyled>
					);
				})}
			</Box>

			<Box sx={{
				marginTop: "auto",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "24px",

				"> button":
				{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					border: "unset",
					background: "unset",

					"&:disabled":
					{
						cursor: "auto",
						color: "#707070"
					}
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

				<Box sx={{
					position: "relative",
					border: "3px solid #252525",
					width: "56px",
					height: "56px",
					borderRadius: "50%",

					"& span":
					{
						display: "block",
						textAlign: "center",
						font: "400 14px/50px Consolas"
					}
				}}>
					<CircularProgress
						variant="determinate"
						size={56}
						value={Math.floor((currentQuestionIndex * 100) / questions.length)}
						thickness={3}
						sx={{
							position: "absolute",
							left: "-3px",
							top: "-3px",
							color: "#DC4242"
						}}
					/>
					<span>{currentQuestionIndex + 1}/{questions.length}</span>
				</Box>

				<button
					disabled={selectedAnswer === null}
					onClick={nextQuestion}
				>
					{currentQuestionIndex < questions.length - 1
						? <ArrowForwardIcon sx={{ fontSize: "56px" }} />
						: <FlagIcon sx={{ fontSize: "56px" }} />
					}
				</button>
			</Box>
		</Box >
	);
}

export default Game;
