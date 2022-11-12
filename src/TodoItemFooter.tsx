import { useState } from 'react';
import TagMenu from 'TagMenu';
import './TodoItemFooter.css';

interface TodoItemFooterProps {
	addedOn: Date;
	todoItemId: number;
}

function TodoItemFooter(props: TodoItemFooterProps) {
	const [tagMenuState, setTagMenuState] = useState(false);

	const tagMenu = tagMenuState ? (
		<TagMenu
			todoItemId={props.todoItemId}
			setTagMenuState={setTagMenuState}
		></TagMenu>
	) : null;

	return (
		<div className='todo-item-footer'>
			<table className='todo-item-footer-table'>
				<tbody>
					<tr>
						<td>
							<button
								className='todo-item-footer-add-tag'
								type='button'
								onClick={() => setTagMenuState(true)}
							>
								add tag
							</button>
							{tagMenu}
						</td>
						<td className='todo-item-footer-added-on'>
							{/* FIXME: stopped working recently, investigate */}
							added on: {props.addedOn.toLocaleString()}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default TodoItemFooter;
