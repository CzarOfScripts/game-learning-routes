import { Box, Button, alpha } from "@mui/material";
import { AppContext } from "App";
import ButtonStyled from "components/ButtonStyled";
import { CitiesNameType, data, getCityImage } from "data/data";
import { useContext, useLayoutEffect, useState } from "react";
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

function Game()
{
	const AppCtx = useContext(AppContext);

	const city = AppCtx.selectedCity as CitiesNameType;

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
	}

	function nextQuestion()
	{
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
			width: "250px",
			height: "calc(100vh - 59px - (40px * 2) - 70px)",
			margin: "0 auto"
		}}>
			<Box sx={{
				position: "relative",
				width: "250px",
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

			<Button
				disabled={selectedAnswer === null}
				onClick={nextQuestion}
				sx={{
					marginTop: "auto",
					height: "50px",
					borderRadius: "20px",
					backgroundColor: "#252525",
					color: "#FFFFFF",

					"&:disabled":
					{
						backgroundColor: "#151515",
						color: "#909090"
					}
				}}
			>
				{currentQuestionIndex < questions.length - 1
					? "Следующий"
					: "Завершить"
				}
			</Button>
		</Box >
	);
}

export default Game;
