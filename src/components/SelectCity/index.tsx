import { Box, alpha } from "@mui/material";
import { AppContext } from "App";
import ButtonStyled from "components/ButtonStyled";
import { CitiesNameType, data, getCityImage } from "data/data";
import { useContext } from "react";

function SelectCity()
{
	const AppCtx = useContext(AppContext);

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
						onClick={() => AppCtx.setSelectedCity(city as CitiesNameType)}
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
		</Box>
	);
}

export default SelectCity;
