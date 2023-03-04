import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Input, TodoListMenuItem } from 'features';
import { TodoListContext, StorageContext } from 'contexts';
import { TodoListCommand, TodoListAction } from 'reducers';
import { setDataInLocalStorage } from 'utils';

interface TodoListMenuProps {
	todoItemId: number;
	setTodoListMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

// OPTIMIZE: this should be easier to manage as a class
function TodoListMenu(props: TodoListMenuProps) {
	const todoListMenu = useRef<HTMLElement>(null);
	const { onClickOutside } = props;
	const storageContext = useContext(StorageContext);
	const { todoListStorageState, todoListStorageDispatch } =
		useContext(TodoListContext);
	const [newTodoList, setNewTodoList] = useState<string>('');
	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	// TODO: generalize this for use elsewhere
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				todoListMenu.current !== null &&
				!todoListMenu.current.contains(event.target as Node)
			) {
				onClickOutside && onClickOutside();
			}
		};
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onClickOutside]);

	if (storageContext !== null) {
		useEffect(() => {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				setDataInLocalStorage(
					todoListStorageState.todoListStorage,
					storageContext.todoListStorageKey
				);
			}
		}, [todoListStorageState]);
	}
	// TODO: think about generalizing all reducer calls
	const addTodoList = (todoListName: string, todoItemId: number) => {
		const todoListAction: TodoListAction = {
			type: TodoListCommand.Add,
			payload: {
				todoListId: todoListStorageState.currentTodoListId,
				todoListName,
				todoListItems: [todoItemId],
			},
		};

		todoListStorageDispatch(todoListAction);

		setNewTodoList('');
	};

	const switchTodoList = (
		todoListId: number,
		todoItemId: number,
		checked: boolean
	) => {
		const actionType = checked
			? TodoListCommand.RemoveTodoItem
			: TodoListCommand.AddTodoItem;

		const todoListAction: TodoListAction = {
			type: actionType,
			payload: {
				todoListId,
				todoItemId,
			},
		};

		todoListStorageDispatch(todoListAction);
	};

	const removeTodoList = (todoListId: number) => {
		const todoListAction: TodoListAction = {
			type: TodoListCommand.Remove,
			payload: {
				todoListId,
			},
		};

		todoListStorageDispatch(todoListAction);
	};

	return (
		<aside
			className='absolute top-20 bg-white rounded px-3 py-2 z-10'
			ref={todoListMenu}
		>
			{todoListStorageState.todoListStorage.map((todoList) => {
				let checked = false;

				if (todoList.todoListItems.includes(props.todoItemId)) {
					checked = true;
				}

				// OPTIMIZE: this seems excessive
				return (
					<TodoListMenuItem
						key={todoList.todoListId}
						checked={checked}
						todoItemId={props.todoItemId}
						todoListId={todoList.todoListId}
						todoListName={todoList.todoListName}
						todoListItems={todoList.todoListItems}
						switchTodoList={switchTodoList}
						removeTodoList={removeTodoList}
					/>
				);
			})}
			<form onSubmit={(event) => event.preventDefault()}>
				<Input
					id='add-new-list'
					value={newTodoList}
					onChange={(event: React.ChangeEvent) =>
						setNewTodoList((event.target as HTMLInputElement).value)
					}
				/>
				<Button
					innerText='add'
					onClick={() => addTodoList(newTodoList, props.todoItemId)}
				/>
			</form>
		</aside>
	);
}

export default TodoListMenu;
