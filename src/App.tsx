import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box } from "@mui/material";
import SettingsModal from "Settings.modal";
import CustomIconButton from "components/CustomIconButton";
import Game, { GameType } from "components/Game";
import ScoreScreen from "components/ScoreScreen";
import SelectCity from "components/SelectCity";
import Wrapper from "components/Wrapper";
import { CitiesNameType } from "data/data";
import { Dispatch, SetStateAction, createContext, useLayoutEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "utils/localStorage";

interface IAppContext
{
	selectedCity: CitiesNameType | null;
	setSelectedCity: Dispatch<SetStateAction<CitiesNameType | null>>;

	result: [ number, number ] | null;
	setResult: Dispatch<SetStateAction<[ number, number ]>>;

	isShowResult: boolean;
	setIsShowResult: Dispatch<SetStateAction<boolean>>;

	timer: [ startTime: Date, endTime: Date ] | null;
	setTimer: Dispatch<SetStateAction<[ startTime: Date, endTime: Date ] | null>>;

	settings: ISettings;
	setSettings: Dispatch<SetStateAction<ISettings>>;

	selectedGameTypes: GameType[];
	setSelectedGameTypes: Dispatch<SetStateAction<GameType[]>>;
}

interface ISettings
{
	/**
	 * @default true
	 */
	autoNextQuestion: boolean;
}

const defaultSettings: ISettings =
{
	autoNextQuestion: true
};

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App()
{
	const [ isShowSettings, setIsShowSettings ] = useState<boolean>(false);
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
	const [ selectedGameTypes, setSelectedGameTypes ] = useState<GameType[]>(() =>
	{
		const store = getLocalStorage<GameType[]>("game-selectedGameTypes");

		return store ?? [ GameType.ONE_CORRECT, GameType.ONE_WRONG, GameType.TRUE_FALSE ];
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
	const [ settings, setSettings ] = useState<ISettings>(() =>
	{
		const store = getLocalStorage<ISettings>("game-settings");

		return Object.assign({}, defaultSettings, store);
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

	useLayoutEffect(() =>
	{
		setLocalStorage("game-settings", settings);
	}, [ settings ]);

	useLayoutEffect(() =>
	{
		setLocalStorage("game-selectedGameTypes", selectedGameTypes);
	}, [ selectedGameTypes ]);

	// Render
	return (
		<AppContext.Provider value={{
			selectedCity, setSelectedCity,
			result, setResult,
			isShowResult, setIsShowResult,
			timer, setTimer,
			settings, setSettings,
			selectedGameTypes, setSelectedGameTypes
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
					<CustomIconButton
						icon={SettingsRoundedIcon}
						size={19}
						onClick={() => setIsShowSettings(true)}
					/>
				</Wrapper>
			</Box>

			<Box
				className="main"
				component="main"
				sx={{
					display: "flex",
					flexDirection: "column",
					padding: "40px 20px",
					height: "100%",
					minHeight: "calc(100vh - 59px - 80px)",

					"@supports (min-height: 0cqh)":
					{
						minHeight: "calc(100cqh - 59px)",
					}
				}}
			>
				<Wrapper sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
					{selectedCity === null
						? <SelectCity />
						: isShowResult === false
							? <Game />
							: <ScoreScreen />
					}
				</Wrapper>
			</Box>

			<SettingsModal
				open={isShowSettings}
				onClose={() => setIsShowSettings(false)}
			/>
		</AppContext.Provider>
	);
}

export default App;
