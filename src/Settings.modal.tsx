import { AppContext } from "App";
import CheckboxStyled from "components/CheckboxStyled";
import DialogStyled from "components/DialogStyled";
import { ChangeEvent, useContext } from "react";

export interface ISettingsModalProps
{
	/**
	 * @default false
	 */
	open: boolean;
	onClose(event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButton"): void;
	[ prop: string ]: any;
}

function SettingsModal({ open = false, onClose, ...props }: ISettingsModalProps)
{
	const AppCtx = useContext(AppContext);

	// Handles
	function onChangeCheckbox(settingName: keyof typeof AppCtx[ "settings" ])
	{
		return (_event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
		{
			AppCtx.setSettings((prevState) =>
			{
				return Object.assign({}, prevState, { [ settingName ]: checked });
			});
		};
	}

	//
	return (
		<DialogStyled
			open={open}
			onClose={onClose}
			title="Настройки"
			{...props}
		>
			<CheckboxStyled
				label="Авто переход на новый вопрос"
				checkboxProps={{
					checked: AppCtx.settings.autoNextQuestion,
					onChange: onChangeCheckbox("autoNextQuestion")
				}}
			/>
		</DialogStyled>
	);
}

export default SettingsModal;
