import { StorageProps } from 'contexts/storage-context';
import { TagStorageState } from 'contexts/tag-context';
import { getTags } from 'helpers/local-storage';

export function initializeStorageState(
	storageContext: StorageProps
): TagStorageState {
	let currentTagId = 0;
	const tagStorage = getTags(storageContext.tagStorageKey);

	if (tagStorage.length > 0) {
		currentTagId = tagStorage[tagStorage.length - 1].tagId + 1;
	}

	return {
		tagStorage,
		currentTagId,
	};
}
