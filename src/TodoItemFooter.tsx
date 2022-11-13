import { AppContext } from 'AppContext';
import { useContext, useState } from 'react';
import TagMenu, { saveTags } from 'TagMenu';
import './TodoItemFooter.css';

interface TodoItemFooterProps {
	addedOn: Date;
	todoItemId: number;
}

function TodoItemFooter(props: TodoItemFooterProps) {
	const appContext = useContext(AppContext);
	const [tagMenuState, setTagMenuState] = useState(false);

	const tagMenu = tagMenuState ? (
		<TagMenu
			todoItemId={props.todoItemId}
			setTagMenuState={setTagMenuState}
			onClickOutside={() => {
				if (appContext !== null) {
					saveTags(appContext);
				}

				setTagMenuState(false);
			}}
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
								disabled={tagMenuState}
								onClick={() => setTagMenuState(true)}
							>
								tags
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
