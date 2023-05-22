/**
 * Set a value for LocalStorage key (automatically does JSON.stringify)
 * @param {string} key
 * @param {any} value
 */
export function setLocalStorage(key: string, value: any): void
{
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get value from localStorage (automatically does JSON.parse)
 * @param {string} key
 */
export function getLocalStorage<T>(key: string): T | null
{
	const store = localStorage.getItem(key);

	if (typeof store === "string")
	{
		try
		{
			return JSON.parse(store) as T;
		}
		catch (e)
		{
			return null;
		}
	}

	return null;
}
