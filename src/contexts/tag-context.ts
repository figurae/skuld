import { createContext, Dispatch } from 'react';
import { TagAction } from 'reducers/tag-reducer';

export interface TagData {
	tagId: number;
	tagName: string;
	tagItems: Array<number>;
}

export interface TagStorageState {
	tagStorage: Array<TagData>;
	currentTagId: number;
}

const initialState: TagStorageState = {
	tagStorage: [],
	currentTagId: 0,
};

export const TagContext = createContext<{
	tagStorageState: TagStorageState;
	tagStorageDispatch: Dispatch<TagAction>;
}>({
	tagStorageState: initialState,
	tagStorageDispatch: () => null,
});
