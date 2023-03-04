import { TodoItemData, TodoItemStorageState } from 'contexts';

// automate action type creation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? { type: Key }
		: { type: Key; payload: M[Key] };
};

export enum TodoItemCommand {
	Add,
	Remove,
	Clear,
	Rename,
}

type TodoItemPayload = {
	[TodoItemCommand.Add]: TodoItemData;
	[TodoItemCommand.Remove]: { todoItemId: number };
	[TodoItemCommand.Clear]: undefined; // TODO: is this correct?
	[TodoItemCommand.Rename]: { todoItemId: number; newTodoItemName: string };
};

export type TodoItemAction =
	ActionMap<TodoItemPayload>[keyof ActionMap<TodoItemPayload>];

// OPTIMIZE: this could be generalized for both todos and todo lists
export function todoItemReducer(
	state: TodoItemStorageState,
	action: TodoItemAction
): TodoItemStorageState {
	switch (action.type) {
		case TodoItemCommand.Add: {
			const todoItemStorage = [
				...state.todoItemStorage,
				{
					todoItemId: action.payload.todoItemId,
					todoItemName: action.payload.todoItemName,
					todoItemCreated: action.payload.todoItemCreated,
					todoItemProgress: 0,
				},
			];

			const currentTodoItemId = state.currentTodoItemId + 1;

			return {
				...state,
				todoItemStorage: todoItemStorage,
				currentTodoItemId: currentTodoItemId,
			};
		}

		case TodoItemCommand.Remove: {
			const todoItemStorage = state.todoItemStorage.filter(
				(todoItem) => todoItem.todoItemId !== action.payload.todoItemId
			);

			return { ...state, todoItemStorage };
		}

		case TodoItemCommand.Clear:
			return { todoItemStorage: [], currentTodoItemId: 0 };

		case TodoItemCommand.Rename: {
			const index = state.todoItemStorage
				.map((todoItem) => todoItem.todoItemId)
				.indexOf(action.payload.todoItemId);

			const todoItemStorage = state.todoItemStorage;
			todoItemStorage[index].todoItemName = action.payload.newTodoItemName;

			return { ...state, todoItemStorage };
		}

		default:
			return state;
	}
}
