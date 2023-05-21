import { Box } from "@mui/material";
import Game from "components/Game";
import ScoreScreen from "components/ScoreScreen";
import SelectCity from "components/SelectCity";
import { CitiesNameType } from "data/data";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

function Wrapper({ children }: { children: ReactNode; })
{
	return (
		<Box className="Wrapper" sx={{ maxWidth: "300px", margin: "0 auto" }}>
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
	setIsShowResult: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App()
{
	const [ selectedCity, setSelectedCity ] = useState<CitiesNameType | null>(null);
	const [ result, setResult ] = useState<[ number, number ]>([ 0, 0 ]);
	const [ isShowResult, setIsShowResult ] = useState<boolean>(false);

	return (
		<AppContext.Provider value={{
			selectedCity, setSelectedCity,
			result, setResult,
			isShowResult, setIsShowResult
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
				<Wrapper>Изучение маршрутов в виде игры</Wrapper>
			</Box>

			<Box
				className="main"
				component="main"
				sx={{ padding: "40px 20px" }}
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
