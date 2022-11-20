import { ItemProps, ItemStorageState } from 'contexts/item-context';

// automate action type creation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? { type: Key }
		: { type: Key; payload: M[Key] };
};

export enum Item {
	Add,
	Remove,
	Clear,
	Rename,
}

type ItemPayload = {
	[Item.Add]: ItemProps;
	[Item.Remove]: { itemId: number };
	[Item.Clear]: Item;
	[Item.Rename]: { itemId: number; newName: string };
};

export type ItemAction = ActionMap<ItemPayload>[keyof ActionMap<ItemPayload>];

// OPTIMIZE: this could be generalized for both items and tags
export function itemReducer(
	state: ItemStorageState,
	action: ItemAction
): ItemStorageState {
	switch (action.type) {
		case Item.Add: {
			const itemStorage = [
				...state.itemStorage,
				{
					itemId: action.payload.itemId,
					itemName: action.payload.itemName,
					itemCreated: action.payload.itemCreated,
					itemProgress: 0,
				},
			];

			const currentItemId = state.currentItemId + 1;

			return {
				...state,
				itemStorage,
				currentItemId,
			};
		}

		case Item.Remove: {
			const itemStorage = state.itemStorage.filter(
				(item) => item.itemId !== action.payload.itemId
			);

			return { ...state, itemStorage };
		}

		case Item.Clear:
			return { itemStorage: [], currentItemId: 0 };

		case Item.Rename: {
			const index = state.itemStorage
				.map((item) => item.itemId)
				.indexOf(action.payload.itemId);

			const itemStorage = state.itemStorage;
			itemStorage[index].itemName = action.payload.newName;

			return { ...state, itemStorage };
		}

		default:
			return state;
	}
}
