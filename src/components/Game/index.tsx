import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, CircularProgress, Zoom, alpha } from "@mui/material";
import { AppContext } from "App";
import ButtonStyled from "components/ButtonStyled";
import CustomIconButton from "components/CustomIconButton";
import { CitiesNameType, data, getCityImage } from "data/data";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { getRandomItem, shuffleArray } from "utils";
import { getLocalStorage, setLocalStorage } from "utils/localStorage";

export enum GameType
{
	ONE_CORRECT,
	ONE_WRONG,
	TRUE_FALSE
};

type AnswerType = { text: string; description?: string; isAnswer?: boolean; };

type QuestionType = {
	answers: AnswerType[],
	data?: { [ key: string ]: string; },
	gameType: GameType;
};

const AUTO_NEXT_QUESTION_TIME: number = 3500;

function Game()
{
	const AppCtx = useContext(AppContext);

	const city = AppCtx.selectedCity as CitiesNameType;

	const timerIdRef = useRef<NodeJS.Timeout>();
	const [ selectedAnswer, setSelectedAnswer ] = useState<number | null>(() =>
	{
		const store = getLocalStorage<number>("game-selectedAnswer");

		return store;
	});
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState<number>(() =>
	{
		const store = getLocalStorage<number>("game-currentQuestionIndex");

		return store ?? 0;
	});
	const [ questions ] = useState<QuestionType[]>(() =>
	{
		const store = getLocalStorage<QuestionType[]>("game-questions");
		if (store !== null)
		{
			return store;
		}

		const array: QuestionType[] = [];
		const areasCount = data[ city ].areas.length;

		for (let i = 0; i < areasCount; i++)
		{
			array.push(createQuestion(data[ city ].areas[ i ], getRandomItem(AppCtx.selectedGameTypes)));
		}

		shuffleArray(array);

		return array;
	});

	const currentQuestion = questions[ currentQuestionIndex ];

	// Effects
	useLayoutEffect(() =>
	{
		setLocalStorage("game-questions", questions);

		AppCtx.setResult((prevState) =>
		{
			return Object.assign([], prevState, { 1: questions.length });
		});
	}, [ questions ]); // eslint-disable-line

	useLayoutEffect(() =>
	{
		setLocalStorage("game-selectedAnswer", selectedAnswer);
	}, [ selectedAnswer ]);

	useLayoutEffect(() =>
	{
		setLocalStorage("game-currentQuestionIndex", currentQuestionIndex);
	}, [ currentQuestionIndex ]);

	// Utils
	function getRandomCity(withoutCity?: CitiesNameType): CitiesNameType
	{
		let cities = Object.keys(data) as CitiesNameType[];

		if (withoutCity !== undefined)
		{
			cities = cities.filter((city) => city !== withoutCity);
		}

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

				const answers: QuestionType[ "answers" ] = [
					{ text: area, description: city, isAnswer: true },
					{ text: area1, description: city1 },
					{ text: area2, description: city2 }
				];

				shuffleArray(answers);

				return { answers, gameType };
			}
			case GameType.ONE_WRONG: {
				const badCity = getRandomCity(city);
				const badArea = getRandomArea(badCity);

				const answers: QuestionType[ "answers" ] = [
					{ text: area, description: city },
					{ text: getRandomArea(city, area), description: city },
					{ text: badArea, description: badCity, isAnswer: true }
				];

				shuffleArray(answers);

				return { answers, gameType };
			}
			case GameType.TRUE_FALSE: {

				const randomCity = (Math.round(Math.random()) === 0
					? getRandomCity(city)
					: city
				);
				const randomArea = (randomCity === city
					? area
					: getRandomArea(randomCity)
				);

				const answers: QuestionType[ "answers" ] = [
					{
						text: "Да",
						isAnswer: (randomCity === city)
					},
					{
						text: "Нет",
						isAnswer: (randomCity !== city),
						description: (randomCity !== city ? `${ randomArea } из ${ randomCity }` : undefined)
					}
				];

				return {
					answers,
					data: { area },
					gameType
				};
			}
		}
	}

	function isCorrectAnswer(index: number): 1 | 0 | -1
	{
		if (selectedAnswer === null)
		{
			return -1;
		}

		if (currentQuestion.answers[ index ].isAnswer === true)
		{
			return 1;
		}

		return index === selectedAnswer ? 0 : -1;
	}

	// Handles
	function selectAnswer(index: number)
	{
		if (selectedAnswer !== null)
		{
			return;
		}

		setSelectedAnswer(index);

		clearTimeout(timerIdRef.current);
		if (AppCtx.settings.autoNextQuestion === true)
		{
			timerIdRef.current = setTimeout(() => nextQuestion(index), AUTO_NEXT_QUESTION_TIME);
		}
	}

	function nextQuestion(index?: number)
	{
		clearTimeout(timerIdRef.current);

		const answerIndex = (selectedAnswer ?? index) as number;

		if (currentQuestion.answers[ answerIndex ].isAnswer === true)
		{
			AppCtx.setResult((prevState) =>
			{
				return Object.assign([], prevState, { 0: prevState[ 0 ] + 1 });
			});
		}

		if (currentQuestionIndex === questions.length - 1)
		{
			AppCtx.setIsShowResult(true);
			AppCtx.setTimer((prevState) =>
			{
				return Object.assign([], prevState, { 1: new Date() });
			});

			return;
		}

		setCurrentQuestionIndex((prevState) => prevState + 1);
		setSelectedAnswer(null);
	}

	// Render
	return (
		<Box sx={{
			display: "flex",
			flexGrow: 1,
			flexDirection: "column",
			gap: "24px"
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
				{currentQuestion.gameType === GameType.ONE_CORRECT
					? <>Выберите правильный район</>
					: currentQuestion.gameType === GameType.ONE_WRONG
						? <>Выберите <i style={{ fontStyle: "italic" }}>НЕправильный</i> район</>
						: <>Имеет ли район {currentQuestion.data!.area}?</>
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
				{currentQuestion.answers.map((questionData, index) =>
				{
					return (
						<ButtonStyled
							key={index}
							disableRipple
							disableFocusRipple
							disableTouchRipple
							onClick={() => selectAnswer(index)}
							className={
								isCorrectAnswer(index) === 1
									? "answer--true"
									: isCorrectAnswer(index) === 0
										? "answer--false"
										: ""
							}
							sx={{
								flexDirection: "column",
								gap: "2px",
								borderLeft: (
									(questionData.isAnswer === true && process.env.NODE_ENV === "development")
										? "1px solid red"
										: "unset"
								)
							}}
						>
							<span>{questionData.text}</span>
							{(selectedAnswer !== null && questionData.description !== undefined) &&
								(
									<Zoom in={true} timeout={350}>
										<span style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>
											({questionData.description})
										</span>
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
				gap: "24px"
			}}>
				<CustomIconButton
					icon={HomeRoundedIcon}
					size={56}
					onClick={() =>
					{
						AppCtx.setSelectedCity(null);
						AppCtx.setIsShowResult(false);
						AppCtx.setTimer(null);
						AppCtx.setResult([ 0, 0 ]);

						localStorage.removeItem("game-selectedAnswer");
						localStorage.removeItem("game-questions");
						localStorage.removeItem("game-currentQuestionIndex");
					}}
				/>

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
					<span>{(currentQuestionIndex + 1).toString().padStart(2, "0")}/{questions.length}</span>
				</Box>

				<CustomIconButton
					icon={
						currentQuestionIndex < questions.length - 1
							? ArrowForwardRoundedIcon
							: FlagRoundedIcon
					}
					size={56}
					disabled={selectedAnswer === null}
					onClick={() => nextQuestion()}
				>
				</CustomIconButton>
			</Box>
		</Box>
	);
}

export default Game;
