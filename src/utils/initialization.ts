import { StorageProps, ItemStorageState, TagStorageState } from 'contexts';
import { getItems } from 'utils';

export function initializeStorageState(
	storageContext: StorageProps
): [ItemStorageState, TagStorageState] {
	let currentTagId = 0;
	let currentItemId = 0;

	const tagStorage = getItems(storageContext.tagStorageKey);
	const itemStorage = getItems(storageContext.itemStorageKey);

	if (tagStorage.length > 0) {
		currentTagId = tagStorage[tagStorage.length - 1].tagId + 1;
	}

	if (itemStorage.length > 0) {
		currentItemId = itemStorage[itemStorage.length - 1].itemId + 1;
	}

	return [
		{ itemStorage, currentItemId },
		{ tagStorage, currentTagId },
	];
}
