import { StorageProps, TagProps } from 'contexts/storage';
import { setInLocalStorage, getFromLocalStorage } from 'helpers/local-storage';

export function storeTags(storageContext: StorageProps) {
	if (storageContext.tagStorage.length > 0) {
		setInLocalStorage(storageContext.tagStorageKey, storageContext.tagStorage);
	}
}

export function getTags(tagListKey: string): Array<TagProps> {
	const storedTagList = getFromLocalStorage(tagListKey);

	return storedTagList ? storedTagList : [];
}

export function addNewTag(storageContext: StorageProps, newTag: TagProps) {
	storageContext.tagStorage.push(newTag);

	storeTags(storageContext);
}
