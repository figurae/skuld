import {
	StorageProps,
	TodoItemStorageState,
	TodoListStorageState,
} from 'contexts';
import { getDataFromLocalStorage } from 'utils';

export function initializeStorageState(
	storageContext: StorageProps
): [TodoItemStorageState, TodoListStorageState] {
	let currentTodoListId = 0;
	let currentTodoItemId = 0;

	const todoListStorage = getDataFromLocalStorage(
		storageContext.todoListStorageKey
	);
	const todoItemStorage = getDataFromLocalStorage(
		storageContext.todoItemStorageKey
	);

	if (todoListStorage.length > 0) {
		currentTodoListId =
			todoListStorage[todoListStorage.length - 1].todoListId + 1;
	}

	if (todoItemStorage.length > 0) {
		currentTodoItemId = todoItemStorage[todoItemStorage.length - 1].itemId + 1;
	}

	return [
		{ todoItemStorage, currentTodoItemId },
		{ todoListStorage, currentTodoListId },
	];
}
