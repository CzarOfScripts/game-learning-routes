export function timeToObject(ms: number)
{
	ms = Math.abs(ms);

	const totalSeconds = Math.floor(ms / 1000);

	const seconds = totalSeconds % 60;
	const minutes = Math.floor(totalSeconds / 60 % 60);
	const hours = Math.floor(totalSeconds / (60 * 60) % 24);
	const days = Math.floor(totalSeconds / (60 * 60 * 24));

	return { days, hours, minutes, seconds, ms: ms % 1000 };
}
