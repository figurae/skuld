import { TodoItemData, TodoListData } from 'contexts';

export function setInLocalStorage(storageKey: string, obj: object): void {
	localStorage.setItem(storageKey, JSON.stringify(obj));
}

export function getFromLocalStorage(storageKey: string) {
	return JSON.parse(localStorage.getItem(storageKey) as string);
}

export function setDataInLocalStorage(
	dataStorage: Array<TodoItemData | TodoListData>,
	dataStorageKey: string
) {
	// TODO: analyze this
	if (dataStorage.length > 0) {
		setInLocalStorage(dataStorageKey, dataStorage);
	}

	if (dataStorage.length == 0) {
		localStorage.removeItem(dataStorageKey);
	}
}

export function getDataFromLocalStorage(dataStorageKey: string) {
	const storedData = getFromLocalStorage(dataStorageKey);

	return storedData ? storedData : [];
}
