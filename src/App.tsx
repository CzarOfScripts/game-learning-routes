import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Game from "components/Game";
import ScoreScreen from "components/ScoreScreen";
import SelectCity from "components/SelectCity";
import { CitiesNameType } from "data/data";
import { Dispatch, ReactNode, SetStateAction, createContext, useLayoutEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "utils/localStorage";

function Wrapper({ children, sx = [], ...props }: { children: ReactNode; } & BoxProps)
{
	return (
		<Box
			className="Wrapper"
			sx={[
				{
					maxWidth: "300px",
					margin: "0 auto",
					height: "100%"
				},
				...Array.isArray(sx) ? sx : [ sx ]
			]}
			{...props}
		>
			{children}
		</Box>
	);
}

interface IAppContext
{
	selectedCity: CitiesNameType | null,
	setSelectedCity: Dispatch<SetStateAction<CitiesNameType | null>>,

	result: [ number, number ] | null,
	setResult: Dispatch<SetStateAction<[ number, number ]>>,

	isShowResult: boolean,
	setIsShowResult: Dispatch<SetStateAction<boolean>>,

	timer: [ startTime: Date, endTime: Date ] | null,
	setTimer: Dispatch<SetStateAction<[ startTime: Date, endTime: Date ] | null>>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App()
{
	const [ selectedCity, setSelectedCity ] = useState<CitiesNameType | null>(() =>
	{
		const store = getLocalStorage<CitiesNameType | null>("game-selectedCity");

		return store;
	});
	const [ result, setResult ] = useState<[ number, number ]>(() =>
	{
		const store = getLocalStorage<[ number, number ]>("game-result");

		return store ?? [ 0, 0 ];
	});
	const [ isShowResult, setIsShowResult ] = useState<boolean>(() =>
	{
		const store = getLocalStorage<boolean>("game-isShowResult");

		return store ?? false;
	});
	const [ timer, setTimer ] = useState<[ startTime: Date, endTime: Date ] | null>(() =>
	{
		const store = getLocalStorage<[ startTime: string, endTime: string ] | null>("game-timer");

		return store !== null
			? [ new Date(store[ 0 ]), new Date(store[ 1 ]) ]
			: null;
	});

	// Effects
	useLayoutEffect(() =>
	{
		setLocalStorage("game-result", result);
	}, [ result ]);

	useLayoutEffect(() =>
	{
		setLocalStorage("game-isShowResult", isShowResult);
	}, [ isShowResult ]);

	useLayoutEffect(() =>
	{
		setLocalStorage("game-selectedCity", selectedCity);
	}, [ selectedCity ]);

	useLayoutEffect(() =>
	{
		setLocalStorage("game-timer", timer);
	}, [ timer ]);

	// Render
	return (
		<AppContext.Provider value={{
			selectedCity, setSelectedCity,
			result, setResult,
			isShowResult, setIsShowResult,
			timer, setTimer
		}}>
			<Box
				className="header"
				component="header"
				sx={{
					position: "sticky",
					top: "0px",
					padding: "20px",
					textAlign: "center",
					font: "400 16px/19px Consolas",
					backgroundColor: "#181818"
				}}
			>
				<Wrapper sx={{ display: "flex", gap: "24px", justifyContent: "space-between", alignItems: "center" }}>
					<SearchRoundedIcon sx={{ fontSize: "19px" }} />
					<span style={{ flexGrow: 1, textAlign: "center" }}>Изучение районов</span>
						<SettingsRoundedIcon />
				</Wrapper>
			</Box>

			<Box
				className="main"
				component="main"
				sx={{
					padding: "40px 20px",
					height: "calc(100vh - 59px - 80px)",

					"@supports (height: calc(100cqh - 59px))":
					{
						height: "calc(100cqh - 59px)",
					}
				}}
			>
				<Wrapper>
					{selectedCity === null
						? <SelectCity />
						: isShowResult === false
							? <Game />
							: <ScoreScreen />
					}
				</Wrapper>
			</Box>
		</AppContext.Provider>
	);
}

export default App;
