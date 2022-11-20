import { TagProps } from 'contexts/tag-context';

export function setInLocalStorage(storageKey: string, obj: object): void {
	localStorage.setItem(storageKey, JSON.stringify(obj));
}

export function getFromLocalStorage(storageKey: string) {
	return JSON.parse(localStorage.getItem(storageKey) as string);
}

export function storeTags(tagStorage: Array<TagProps>, tagStorageKey: string) {
	if (tagStorage.length > 0) {
		setInLocalStorage(tagStorageKey, tagStorage);
	}
}

export function getTags(tagStorageKey: string): Array<TagProps> {
	const storedTags = getFromLocalStorage(tagStorageKey);

	return storedTags ? storedTags : [];
}
