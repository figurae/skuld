import { TodoListData, TodoListStorageState } from 'contexts';

// automate action type creation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? { type: Key }
		: { type: Key; payload: M[Key] };
};

export enum TodoListCommand {
	Add,
	Remove,
	Clear,
	Rename,
	AddTodoItem,
	RemoveTodoItem,
}

type TodoListPayload = {
	[TodoListCommand.Add]: TodoListData;
	[TodoListCommand.Remove]: { todoListId: number };
	[TodoListCommand.Clear]: TodoListCommand;
	[TodoListCommand.Rename]: { todoListId: number; newName: string };
	[TodoListCommand.AddTodoItem]: { todoListId: number; todoItemId: number };
	[TodoListCommand.RemoveTodoItem]: { todoListId: number; todoItemId: number };
};

export type TodoListAction =
	ActionMap<TodoListPayload>[keyof ActionMap<TodoListPayload>];

export function todoListReducer(
	state: TodoListStorageState,
	action: TodoListAction
): TodoListStorageState {
	switch (action.type) {
		case TodoListCommand.Add: {
			const todoListStorage = [
				...state.todoListStorage,
				{
					todoListId: action.payload.todoListId,
					todoListName: action.payload.todoListName,
					todoListItems: action.payload.todoListItems,
				},
			];

			const currentTodoListId = state.currentTodoListId + 1;

			return {
				...state,
				todoListStorage,
				currentTodoListId: currentTodoListId,
			};
		}

		case TodoListCommand.Remove: {
			const todoListStorage = state.todoListStorage.filter(
				(todoList) => todoList.todoListId !== action.payload.todoListId
			);

			return { ...state, todoListStorage };
		}

		case TodoListCommand.Clear:
			return { todoListStorage: [], currentTodoListId: 0 };

		case TodoListCommand.Rename: {
			const index = state.todoListStorage
				.map((todoList) => todoList.todoListId)
				.indexOf(action.payload.todoListId);

			const todoListStorage = state.todoListStorage;
			todoListStorage[index].todoListName = action.payload.newName;

			return { ...state, todoListStorage };
		}

		case TodoListCommand.AddTodoItem: {
			const todoListStorage = state.todoListStorage;
			const todoItemId = action.payload.todoItemId;

			const index = todoListStorage
				.map((todoList) => todoList.todoListId)
				.indexOf(action.payload.todoListId);

			if (!todoListStorage[index].todoListItems.includes(todoItemId)) {
				todoListStorage[index].todoListItems.push(todoItemId);
			}

			return { ...state, todoListStorage };
		}

		case TodoListCommand.RemoveTodoItem: {
			const todoListStorage = state.todoListStorage;
			const todoItemId = action.payload.todoItemId;

			const index = todoListStorage
				.map((todoList) => todoList.todoListId)
				.indexOf(action.payload.todoListId);

			const todoListIndex =
				todoListStorage[index].todoListItems.indexOf(todoItemId);

			if (todoListIndex > -1) {
				todoListStorage[index].todoListItems.splice(todoListIndex, 1);
			}

			return { ...state, todoListStorage };
		}

		default:
			return state;
	}
}
