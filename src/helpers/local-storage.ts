import { TagData } from 'contexts/tag-context';

export function setInLocalStorage(storageKey: string, obj: object): void {
	localStorage.setItem(storageKey, JSON.stringify(obj));
}

export function getFromLocalStorage(storageKey: string) {
	return JSON.parse(localStorage.getItem(storageKey) as string);
}

export function storeTags(tagStorage: Array<TagData>, tagStorageKey: string) {
	console.log('in storeTags');
	if (tagStorage.length > 0) {
		setInLocalStorage(tagStorageKey, tagStorage);
	}

	if (tagStorage.length == 0) {
		console.log('uga');
		localStorage.removeItem(tagStorageKey);
	}
}

export function getItems(storageKey: string) {
	const storedItems = getFromLocalStorage(storageKey);

	return storedItems ? storedItems : [];
}
