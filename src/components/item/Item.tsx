// TODO: think about restructuring this component

import { useState } from 'react';
import 'css/Item.css';
import ItemHeader from 'components/item/ItemHeader';
import ItemFooter from 'components/item/ItemFooter';

export interface ItemData {
	itemId: number;
	itemName: string;
	itemDescription?: string;
	itemCreated: Date;
	itemEdited?: Date;
	itemCompleted?: Date;
	itemProgress: number;
	itemTags?: Array<number>;
}

export interface ItemProps {
	item: ItemData;
	deleteItem: (itemId: number) => void;
	editItem: (itemId: number, newItemName: string) => void;
}

function Item(props: ItemProps) {
	const [isEditMode, setEditMode] = useState(false);
	const [newItemName, setNewItemName] = useState(props.item.itemName);

	return (
		<article className='item'>
			<ItemHeader>
				<button
					type='button'
					onClick={() => props.deleteItem(props.item.itemId)}
				>
					&times;
				</button>

				{isEditMode ? (
					<form>
						<input
							autoFocus
							value={newItemName}
							onChange={(event) => setNewItemName(event.target.value)}
							onBlur={() => {
								// TODO: move this to the details pane when it's ready
								// I think this can be done easier with contentEditable
								setEditMode(false);
								props.editItem(props.item.itemId, newItemName);
							}}
						/>
						<button type='button'>save</button>
					</form>
				) : (
					<p onClick={() => setEditMode(true)}>{props.item.itemName}</p>
				)}
			</ItemHeader>
			<ItemFooter
				addedOn={props.item.itemCreated}
				itemId={props.item.itemId}
			></ItemFooter>
		</article>
	);
}

export default Item;
