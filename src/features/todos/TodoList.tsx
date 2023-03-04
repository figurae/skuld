import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TodoItem, TodoListInterface } from 'features';
import {
	TodoItemContext,
	TodoItemData,
	TodoListContext,
	StorageContext,
} from 'contexts';
import {
	TodoItemCommand,
	TodoItemAction,
	TodoListCommand,
	TodoListAction,
} from 'reducers';
import { setDataInLocalStorage } from 'utils';

// TODO: simplify this function
function TodoList() {
	const { todoItemStorageState, todoItemStorageDispatch } =
		useContext(TodoItemContext);
	const todoItemStorage = todoItemStorageState.todoItemStorage;

	const { todoListStorageState, todoListStorageDispatch } =
		useContext(TodoListContext);
	const todoListStorage = todoListStorageState.todoListStorage;

	const storageContext = useContext(StorageContext);

	const { todoListId } = useParams();

	let currentTodoListName = 'all items';
	let currentTodoListIndex = -1;

	if (todoListId !== undefined) {
		currentTodoListIndex = todoListStorage
			.map((todoList) => todoList.todoListId)
			.indexOf(Number(todoListId));

		if (currentTodoListIndex > -1) {
			currentTodoListName = todoListStorage[currentTodoListIndex].todoListName;
		}
	}

	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	useEffect(() => {
		if (storageContext !== null) {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				setDataInLocalStorage(
					todoItemStorage,
					storageContext.todoItemStorageKey
				);
			}
		}
	}, [todoItemStorageState]);

	// TODO: think about generalizing all reducer calls
	const addTodoItem = (todoItemName: string) => {
		const todoItemCreated = new Date();
		const todoItemProgress = 0;

		const newTodoItem: TodoItemData = {
			todoItemId: todoItemStorageState.currentTodoItemId,
			todoItemName,
			todoItemCreated,
			todoItemProgress,
		};

		const todoItemAction: TodoItemAction = {
			type: TodoItemCommand.Add,
			payload: newTodoItem,
		};

		todoItemStorageDispatch(todoItemAction);

		// OPTIMIZE: this really shouldn't be necessary
		// FIXME: this is very much broken now, seems to be a problem with non-unique keys
		if (todoListId !== undefined) {
			const todoListAction: TodoListAction = {
				type: TodoListCommand.AddTodoItem,
				payload: {
					todoListId: parseInt(todoListId),
					todoItemId: newTodoItem.todoItemId,
				},
			};

			todoListStorageDispatch(todoListAction);
		}
	};

	const editTodoItem = (todoItemId: number, newTodoItemName: string) => {
		const todoItemAction: TodoItemAction = {
			type: TodoItemCommand.Rename,
			payload: {
				todoItemId,
				newTodoItemName,
			},
		};

		todoItemStorageDispatch(todoItemAction);
	};

	const deleteTodoItem = (todoItemId: number) => {
		const todoItemAction: TodoItemAction = {
			type: TodoItemCommand.Remove,
			payload: {
				todoItemId,
			},
		};

		todoItemStorageDispatch(todoItemAction);
	};

	// NOTE: this leaves empty lists
	// TODO: move this from todoItemReducer to todoListReducer,
	// as this should be a list-level command
	const clearAllTodoItems = () => {
		const todoItemAction: TodoItemAction = {
			type: TodoItemCommand.Clear,
		};

		todoItemStorageDispatch(todoItemAction);
	};

	return (
		<article className='flex flex-grow flex-col bg-slate-400'>
			<TodoListInterface
				todoListName={currentTodoListName}
				addTodoItem={addTodoItem}
				clearAllTodoItems={clearAllTodoItems}
			></TodoListInterface>
			<div className='flex flex-col h-full overflow-y-auto gap-2 p-4'>
				{todoItemStorage
					.filter((todoItem) => {
						// if no list is selected, return all todo items
						if (currentTodoListIndex === -1) {
							return true;
						}

						// TODO: verify if still crashes when removing last list if active
						return todoListStorage[currentTodoListIndex].todoListItems.includes(
							todoItem.todoItemId
						);
					})
					.map((todoItem, index) => (
						<TodoItem
							key={todoItem.todoItemId}
							todoItem={todoItem}
							todoItemDisplayNumber={index + 1}
							editTodoItem={editTodoItem}
							deleteTodoItem={deleteTodoItem}
						/>
					))}
			</div>
		</article>
	);
}

export default TodoList;
