import { useState } from 'react';
import { Button, Input, TagMenu } from 'features';
import { ItemData } from 'contexts';

export interface TodoItemProps {
	item: ItemData;
	itemNumber: number;
	deleteItem: (itemId: number) => void;
	editItem: (itemId: number, newItemName: string) => void;
}

function TodoItem(props: TodoItemProps) {
	const [isEditMode, setEditMode] = useState(false);
	const [newItemName, setNewItemName] = useState(props.item.itemName);

	const [tagMenuState, setTagMenuState] = useState(false);

	return (
		<article className='relative'>
			{isEditMode ? (
				<form onSubmit={(event) => event.preventDefault()}>
					<Input
						id='edit-item-name'
						className='mb-2'
						autoFocus
						value={newItemName}
						onChange={(event: React.ChangeEvent) =>
							setNewItemName((event.target as HTMLInputElement).value)
						}
					/>
					<Button
						innerText='save'
						// TODO: this is temporary, ultimately implement outside click detection
						// as used in TagMenu + enter support
						onClick={() => {
							setEditMode(false);
							props.editItem(props.item.itemId, newItemName);
						}}
					/>
					<br />
					<Button
						first
						innerText='lists'
						disabled={tagMenuState}
						onClick={() => setTagMenuState(true)}
					/>
					<Button
						type='warning'
						innerText='delete'
						onClick={() => props.deleteItem(props.item.itemId)}
					/>
				</form>
			) : (
				<p onClick={() => setEditMode(true)}>
					{
						// NOTE: I think this can be done easier with contentEditable
						// TODO: place itemNumber in a separate element with fixed width
						// FIXME: when clicking on an item placed higher than the one
						// currently being edited the behavior is inconsistent with
						// clicking on a lower one (begins editing upper one, closes
						// edit mode otherwise)
					}
					<span className='text-slate-600'>{props.itemNumber}.</span>{' '}
					{props.item.itemName}
				</p>
			)}
			{tagMenuState ? (
				<TagMenu
					itemId={props.item.itemId}
					setTagMenuState={setTagMenuState}
					onClickOutside={() => {
						setTagMenuState(false);
					}}
				></TagMenu>
			) : (
				''
			)}
		</article>
	);
}

export default TodoItem;
