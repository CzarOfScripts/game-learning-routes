import { Box, alpha } from "@mui/material";
import { AppContext } from "App";
import ButtonStyled from "components/ButtonStyled";
import CheckboxStyled from "components/CheckboxStyled";
import DialogStyled from "components/DialogStyled";
import { GameType } from "components/Game";
import { CitiesNameType, data, getCityImage } from "data/data";
import { ChangeEvent, useContext, useState } from "react";

function SelectCity()
{
	const AppCtx = useContext(AppContext);
	const [ selectedCity, setSelectedCity ] = useState<CitiesNameType | null>(null);

	// Handles
	function startGame()
	{
		AppCtx.setSelectedCity(selectedCity as CitiesNameType);
		AppCtx.setIsShowResult(false);
		AppCtx.setResult((prevState) =>
		{
			return Object.assign([], prevState, { 0: 0 });
		});

		const date = new Date();
		AppCtx.setTimer([ date, date ]);
	}

	function onChangeCheckbox(gameType: GameType)
	{
		return (_event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
		{
			const index = AppCtx.selectedGameTypes.findIndex((type) => type === gameType);

			AppCtx.setSelectedGameTypes((prevState) =>
			{
				const state = [ ...prevState ];

				if (index !== -1)
				{
					state.splice(index, 1);
				}
				else
				{
					state.push(gameType);
				}

				return state;
			});
		};
	}

	// Render
	return (
		<Box sx={{
			display: "flex",
			flexWrap: "wrap",
			gap: "24px"
		}}>
			{Object.keys(data).map((city) =>
			{
				return (
					<ButtonStyled
						key={city}
						onClick={() =>
						{
							setSelectedCity(city as CitiesNameType);
						}}
						sx={{
							height: "138px !important",
							width: "138px !important",
							font: "400 14px/16px Consolas !important",
							textTransform: "uppercase !important",

							"::before, ::after":
							{
								content: "''",
								position: "absolute",
								top: 0,
								bottom: 0,
								left: 0,
								right: 0
							},
							"::after":
							{
								zIndex: -2,
								background: `url(${ getCityImage(city as CitiesNameType) }) bottom center/cover`,
								objectFit: "cover"
							},
							"::before":
							{
								zIndex: -1,
								backgroundColor: alpha("#000000", 0.5)
							}
						}}
					>
						{city}
					</ButtonStyled>
				);
			})}

			<DialogStyled
				title="Настройка игры"
				open={selectedCity !== null}
				onClose={() => setSelectedCity(null)}
			>
				<CheckboxStyled
					label="Выбор правильного района"
					checkboxProps={{
						checked: AppCtx.selectedGameTypes.includes(GameType.ONE_CORRECT),
						onChange: onChangeCheckbox(GameType.ONE_CORRECT)
					}}
				/>
				<CheckboxStyled
					label="Выбор неправильного района"
					checkboxProps={{
						checked: AppCtx.selectedGameTypes.includes(GameType.ONE_WRONG),
						onChange: onChangeCheckbox(GameType.ONE_WRONG)
					}}
				/>
				<CheckboxStyled
					label="Правильное утверждение или нет"
					checkboxProps={{
						checked: AppCtx.selectedGameTypes.includes(GameType.TRUE_FALSE),
						onChange: onChangeCheckbox(GameType.TRUE_FALSE)
					}}
				/>

				<ButtonStyled
					disabled={AppCtx.selectedGameTypes.length === 0}
					onClick={startGame}
					sx={{
						backgroundColor: "#17720B !important",
						textShadow: "2px 2px #000",
						marginTop: "24px",

						"&:disabled":
						{
							backgroundColor: "#484848 !important",
							color: "#808080"
						}
					}}
				>
					Начать
				</ButtonStyled>
			</DialogStyled>
		</Box>
	);
}

export default SelectCity;
