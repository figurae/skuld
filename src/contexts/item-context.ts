import { createContext, Dispatch } from 'react';
import { ItemAction } from 'reducers/item-reducer';

export interface ItemProps {
	itemId: number;
	itemName: string;
	itemDescription?: string;
	itemCreated: Date;
	itemEdited?: Date;
	itemCompleted?: Date;
	itemProgress: number;
}

export interface ItemStorageState {
	itemStorage: Array<ItemProps>;
	currentItemId: number;
}

const initialState: ItemStorageState = {
	itemStorage: [],
	currentItemId: 0,
};

export const ItemContext = createContext<{
	itemStorageState: ItemStorageState;
	itemStorageDispatch: Dispatch<ItemAction>;
}>({
	itemStorageState: initialState,
	itemStorageDispatch: () => null,
});
