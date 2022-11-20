import { createContext, Dispatch } from 'react';
import { TagAction } from 'reducers/tag-reducer';

export interface TagProps {
	tagId: number;
	tagName: string;
	tagItems: Array<number>;
}

export interface TagStorageState {
	tagStorage: Array<TagProps>;
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
