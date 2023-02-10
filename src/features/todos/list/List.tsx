import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './List.module.sass';
import { Item, ListInterface } from 'features';
import { ItemContext, ItemData, TagContext, StorageContext } from 'contexts';
// TODO: sort Item/Itm naming out
import { Item as Itm, ItemAction, Tag, TagAction } from 'reducers';
import { setItems } from 'utils';

function List() {
	const { itemStorageState, itemStorageDispatch } = useContext(ItemContext);
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
	const storageContext = useContext(StorageContext);
	const { tagId } = useParams();
	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	if (storageContext !== null) {
		useEffect(() => {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				setItems(itemStorageState.itemStorage, storageContext.itemStorageKey);
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

		// OPTIMIZE: this really shouldn't be necessary
		if (tagId !== undefined) {
			const tagAction: TagAction = {
				type: Tag.AddItem,
				payload: {
					tagId: parseInt(tagId),
					itemId: newItem.itemId,
				},
			};

			tagStorageDispatch(tagAction);
		}
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
			// TODO: maybe move list generation elsewhere?
			if (tagId !== undefined) {
				const tagStorage = tagStorageState.tagStorage;
				const index = tagStorageState.tagStorage
					.map((item) => item.tagId)
					.indexOf(parseInt(tagId));

				// if list does not contain item, do not display it
				// FIXME: crashes when removing last tag if active
				if (!tagStorage[index].tagItems.includes(item.itemId)) {
					continue;
				}
			}

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

	// OPTIMIZE: give list name to List from the parent
	let listName = 'all items';

	if (tagId !== undefined) {
		const tagStorage = tagStorageState.tagStorage;
		const index = tagStorageState.tagStorage
			.map((item) => item.tagId)
			.indexOf(parseInt(tagId));

		if (index > -1) {
			listName = tagStorage[index].tagName;
		}
	}

	return (
		<article className={styles.element}>
			<ListInterface
				name={listName}
				addItem={addItem}
				clearList={clearList}
			></ListInterface>
			<div className={styles.content}>{itemNodes}</div>
		</article>
	);
}

export default List;
