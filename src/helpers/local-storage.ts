import { ItemData } from 'contexts/item-context';
import { TagData } from 'contexts/tag-context';

export function setInLocalStorage(storageKey: string, obj: object): void {
	localStorage.setItem(storageKey, JSON.stringify(obj));
}

export function getFromLocalStorage(storageKey: string) {
	return JSON.parse(localStorage.getItem(storageKey) as string);
}

export function storeItems(
	itemStorage: Array<ItemData | TagData>,
	itemStorageKey: string
) {
	// TODO: analyze this
	console.log(itemStorageKey + ': in storeItems');
	if (itemStorage.length > 0) {
		console.log(itemStorageKey + ': setting in localStorage');
		setInLocalStorage(itemStorageKey, itemStorage);
	}

	if (itemStorage.length == 0) {
		console.log(itemStorageKey + ': removing items from localStorage');
		localStorage.removeItem(itemStorageKey);
	}
}

export function getItems(storageKey: string) {
	const storedItems = getFromLocalStorage(storageKey);

	return storedItems ? storedItems : [];
}
