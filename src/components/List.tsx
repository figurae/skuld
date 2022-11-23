import React, { ReactNode, useContext, useEffect, useState } from 'react';
import 'css/List.css';
import ListInterface from 'components/list/ListInterface';
import Item from 'components/item/Item';
import { ItemContext, ItemData } from 'contexts/item-context';
// TODO: sort naming out
import { Item as Itm, ItemAction } from 'reducers/item-reducer';
import { storeItems } from 'helpers/local-storage';
import { StorageContext } from 'contexts/storage-context';

interface ListProps {
	name: string;
}

function List(props: ListProps) {
	const { itemStorageState, itemStorageDispatch } = useContext(ItemContext);
	const storageContext = useContext(StorageContext);
	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	if (storageContext !== null) {
		useEffect(() => {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				storeItems(itemStorageState.itemStorage, storageContext.itemStorageKey);
			}
		}, [itemStorageState]);
	}

	// TODO: think about generalizing all reducer calls
	const addItem = (itemName: string) => {
		const itemCreated = new Date();
		const itemProgress = 0;

		const newItem: ItemData = {
			itemId: itemStorageState.currentItemId,
			itemName,
			itemCreated,
			itemProgress,
		};

		const itemAction: ItemAction = {
			type: Itm.Add,
			payload: newItem,
		};

		itemStorageDispatch(itemAction);
	};

	const editItem = (itemId: number, newName: string) => {
		const itemAction: ItemAction = {
			type: Itm.Rename,
			payload: {
				itemId,
				newName,
			},
		};

		itemStorageDispatch(itemAction);
	};

	const deleteItem = (itemId: number) => {
		const itemAction: ItemAction = {
			type: Itm.Remove,
			payload: {
				itemId,
			},
		};

		itemStorageDispatch(itemAction);
	};

	const clearList = () => {
		const itemAction: ItemAction = {
			type: Itm.Clear,
		};

		itemStorageDispatch(itemAction);
	};

	// OPTIMIZE: generalize/automate to-node conversion
	// also - maybe use state for this?
	const itemNodes: Array<ReactNode> = [];

	if (itemStorageState !== null) {
		for (const item of itemStorageState.itemStorage) {
			itemNodes.push(
				<Item
					key={item.itemId}
					item={item}
					editItem={editItem}
					deleteItem={deleteItem}
				/>
			);
		}
	}

	return (
		<article className='list'>
			<ListInterface
				name={props.name}
				addItem={addItem}
				clearList={clearList}
			></ListInterface>
			<div className='list-content'>{itemNodes}</div>
		</article>
	);
}

export default List;
