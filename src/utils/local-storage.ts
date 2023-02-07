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
	if (itemStorage.length > 0) {
		setInLocalStorage(itemStorageKey, itemStorage);
	}

	if (itemStorage.length == 0) {
		localStorage.removeItem(itemStorageKey);
	}
}

export function getItems(storageKey: string) {
	const storedItems = getFromLocalStorage(storageKey);

	return storedItems ? storedItems : [];
}
