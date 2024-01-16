import { AppContext } from "App";
import CheckboxStyled from "components/CheckboxStyled";
import DialogStyled, { IDialogStyledProps } from "components/DialogStyled";
import { ChangeEvent, useContext } from "react";

export interface ISettingsModalProps extends Omit<IDialogStyledProps, "title" | "children">
{
	/**
	 * @default false
	 */
	readonly open: boolean;
	onClose(event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButton"): void;
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

			<CheckboxStyled
				label="Мгновенный авто переход"
				checkboxProps={{
					checked: AppCtx.settings.instantAutoNextQuestion,
					onChange: onChangeCheckbox("instantAutoNextQuestion")
				}}
			/>

			<CheckboxStyled
				label="Показывать правильный и не правильный ответ"
				checkboxProps={{
					checked: AppCtx.settings.showCorrectAndIncorrectAnswers,
					onChange: onChangeCheckbox("showCorrectAndIncorrectAnswers")
				}}
			/>
		</DialogStyled>
	);
}

export default SettingsModal;
