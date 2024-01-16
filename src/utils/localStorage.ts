import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, defaultValue: T): [ T, SetValue<T> ]
{
	const storedValue = getLocalStorage<T>(key) ?? defaultValue;
	const [ value, setValue ] = useState<T>(storedValue);

	useLayoutEffect(() =>
	{
		function handleStorageChange(event: StorageEvent)
		{
			if (event.key === key)
			{
				setValue(getLocalStorage<T>(key) ?? defaultValue);
			}
		}

		window.addEventListener("storage", handleStorageChange);

		return () => window.removeEventListener("storage", handleStorageChange);
	}, [ key, defaultValue ]);

	function setStoredValue(newValue: T | ((prevValue: T) => T))
	{
		if (typeof newValue === "function")
		{
			setValue((prevValue) =>
			{
				const updatedValue = (newValue as (prevValue: T) => T)(prevValue);

				setLocalStorage(key, updatedValue);

				return updatedValue;
			});
		}
		else
		{
			setValue(newValue);
			setLocalStorage(key, newValue);
		}
	}

	return [ value, setStoredValue ];
}

export function useReadLocalStorage<T>(key: string, defaultValue: T): T
{
	const storedValue = getLocalStorage<T>(key) ?? defaultValue;
	const [ value, setValue ] = useState<T>(storedValue);

	useLayoutEffect(() =>
	{
		function handleStorageChange(event: StorageEvent)
		{
			if (event.key === key)
			{
				setValue(getLocalStorage<T>(key) ?? defaultValue);
			}
		}

		window.addEventListener("storage", handleStorageChange);

		return () => window.removeEventListener("storage", handleStorageChange);
	}, [ key, defaultValue ]);

	return value;
}

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
