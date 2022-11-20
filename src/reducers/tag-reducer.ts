import { TagData, TagStorageState } from 'contexts/tag-context';

// automate action type creation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? { type: Key }
		: { type: Key; payload: M[Key] };
};

export enum Tag {
	Add,
	Remove,
	Clear,
	Rename,
	AddItem,
	RemoveItem,
}

type TagPayload = {
	[Tag.Add]: TagData;
	[Tag.Remove]: { tagId: number };
	[Tag.Clear]: Tag;
	[Tag.Rename]: { tagId: number; newName: string };
	[Tag.AddItem]: { tagId: number; itemId: number };
	[Tag.RemoveItem]: { tagId: number; itemId: number };
};

export type TagAction = ActionMap<TagPayload>[keyof ActionMap<TagPayload>];

export function tagReducer(
	state: TagStorageState,
	action: TagAction
): TagStorageState {
	switch (action.type) {
		case Tag.Add: {
			const tagStorage = [
				...state.tagStorage,
				{
					tagId: action.payload.tagId,
					tagName: action.payload.tagName,
					tagItems: action.payload.tagItems,
				},
			];

			const currentTagId = state.currentTagId + 1;

			return {
				...state,
				tagStorage,
				currentTagId,
			};
		}

		case Tag.Remove: {
			const tagStorage = state.tagStorage.filter(
				(item) => item.tagId !== action.payload.tagId
			);

			return { ...state, tagStorage };
		}

		case Tag.Clear:
			return { tagStorage: [], currentTagId: 0 };

		case Tag.Rename: {
			const index = state.tagStorage
				.map((item) => item.tagId)
				.indexOf(action.payload.tagId);

			const tagStorage = state.tagStorage;
			tagStorage[index].tagName = action.payload.newName;

			return { ...state, tagStorage };
		}

		case Tag.AddItem: {
			const tagStorage = state.tagStorage;
			const itemId = action.payload.itemId;

			const index = tagStorage
				.map((item) => item.tagId)
				.indexOf(action.payload.tagId);

			if (!tagStorage[index].tagItems.includes(itemId)) {
				tagStorage[index].tagItems.push(itemId);
			}

			return { ...state, tagStorage };
		}

		case Tag.RemoveItem: {
			const tagStorage = state.tagStorage;
			const itemId = action.payload.itemId;

			const index = tagStorage
				.map((item) => item.tagId)
				.indexOf(action.payload.tagId);

			const tagIndex = tagStorage[index].tagItems.indexOf(itemId);

			if (tagIndex > -1) {
				tagStorage[index].tagItems.splice(tagIndex, 1);
			}

			return { ...state, tagStorage };
		}

		default:
			return state;
	}
}
