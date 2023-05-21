import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { Box, CircularProgress, alpha } from "@mui/material";
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
	answers: string[],
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

	// Effects
	useLayoutEffect(() =>
	{
		AppCtx.setResult([ 0, questions.length ]);

	}, [ questions ]); // eslint-disable-line react-hooks/exhaustive-deps

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
					area,
					area1,
					area2
				];

				shuffleArray(answers);

				return {
					answers,
					answer: area,
					gameType
				};
			}
			case GameType.ONE_WRONG: {
				const badArea = getRandomArea(getRandomCity(city));

				const answers = [
					area,
					getRandomArea(city, area),
					badArea
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

		if (value === questions[ currentQuestionIndex ].answer)
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

		if (selectedAnswer === questions[ currentQuestionIndex ].answer)
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
			width: "300px",
			height: "calc(100vh - 59px - (40px * 2) - 70px)",
			margin: "0 auto"
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
				{questions[ currentQuestionIndex ]!.gameType === GameType.ONE_CORRECT
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
							onClick={() => selectAnswer(questions[ currentQuestionIndex ]!.answers[ index ])}
							className={
								isCorrectAnswer(questions[ currentQuestionIndex ]!.answers[ index ]) === 1
									? "answer--true"
									: isCorrectAnswer(questions[ currentQuestionIndex ]!.answers[ index ]) === 0
										? "answer--false"
										: ""
							}
						>
							{questions[ currentQuestionIndex ]!.answers[ index ]}
						</ButtonStyled>
					);
				})}
			</Box>

			<Box sx={{
				marginTop: "auto",
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				alignItems: "center",
				justifyItems: "center",
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
					<span>Города</span>
				</button>

				<Box sx={{
					position: "relative",
					border: "3px solid #252525",
					width: "60px",
					height: "60px",
					borderRadius: "50%",
					textAlign: "center",
					font: "400 14px/54px Consolas"
				}}>
					<CircularProgress
						variant="determinate"
						size={60}
						value={Math.floor((currentQuestionIndex * 100) / questions.length)}
						thickness={3}
						sx={{
							position: "absolute",
							left: "-3px",
							top: "-3px",
							color: "#DC4242"
						}}
					/>
					{currentQuestionIndex + 1}/{questions.length}
				</Box>

				<button
					disabled={selectedAnswer === null}
					onClick={nextQuestion}
				>
					<ArrowForwardIcon
						sx={{ fontSize: "56px" }}
					/>
					<span>
						{currentQuestionIndex < questions.length - 1
							? "Следующий"
							: "Завершить"
						}
					</span>
				</button>
			</Box>
		</Box >
	);
}

export default Game;