import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TodoItem as TodoItem, TodoListInterface } from 'features';
import { ItemContext, ItemData, TagContext, StorageContext } from 'contexts';
import { Item, ItemAction, Tag, TagAction } from 'reducers';
import { setItems } from 'utils';

// TODO: simplify this function
function TodoList() {
	const { itemStorageState, itemStorageDispatch } = useContext(ItemContext);
	const itemStorage = itemStorageState.itemStorage;

	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
	const tagStorage = tagStorageState.tagStorage;

	const storageContext = useContext(StorageContext);

	const { tagId } = useParams();

	let currentListName = 'all items';
	// TODO: consider renaming tags to lists
	let currentTagIndex = -1;

	if (tagId !== undefined) {
		currentTagIndex = tagStorage.map((tag) => tag.tagId).indexOf(Number(tagId));

		if (currentTagIndex > -1) {
			currentListName = tagStorage[currentTagIndex].tagName;
		}
	}

	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	useEffect(() => {
		if (storageContext !== null) {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				setItems(itemStorage, storageContext.itemStorageKey);
			}
		}
	}, [itemStorageState]);

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
			type: Item.Add,
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
			type: Item.Rename,
			payload: {
				itemId,
				newName,
			},
		};

		itemStorageDispatch(itemAction);
	};

	const deleteItem = (itemId: number) => {
		const itemAction: ItemAction = {
			type: Item.Remove,
			payload: {
				itemId,
			},
		};

		itemStorageDispatch(itemAction);
	};

	const clearList = () => {
		const itemAction: ItemAction = {
			type: Item.Clear,
		};

		itemStorageDispatch(itemAction);
	};

	return (
		<article className='flex flex-grow flex-col bg-slate-400'>
			<TodoListInterface
				name={currentListName}
				addItem={addItem}
				clearList={clearList}
			></TodoListInterface>
			<div className='flex flex-col h-full overflow-y-auto gap-2 p-4'>
				{itemStorage
					.filter((item) => {
						// if no list is selected, return all items
						if (currentTagIndex === -1) {
							return true;
						}

						// TODO: verify if still crashes when removing last tag if active
						return tagStorage[currentTagIndex].tagItems.includes(item.itemId);
					})
					.map((item, index) => (
						<TodoItem
							key={item.itemId}
							item={item}
							itemNumber={index + 1}
							editItem={editItem}
							deleteItem={deleteItem}
						/>
					))}
			</div>
		</article>
	);
}

export default TodoList;
