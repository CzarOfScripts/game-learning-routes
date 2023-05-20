export function randomInt(min: number, max: number)
{
	return Math.floor(Math.random() * (max - min) + min);
}

export function shuffleArray<T>(array: T[])
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
	}
}

export function getRandomItem<T>(array: T[]): T
{
	return array[ Math.floor(Math.random() * array.length) ];
}
