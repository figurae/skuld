import { createContext, Dispatch } from 'react';
import { TodoItemAction } from 'reducers/todo-item-reducer';

export interface TodoItemData {
	todoItemId: number;
	todoItemName: string;
	todoItemDescription?: string;
	todoItemCreated: Date;
	todoItemEdited?: Date;
	todoItemCompleted?: Date;
	todoItemProgress: number;
}

export interface TodoItemStorageState {
	todoItemStorage: Array<TodoItemData>;
	currentTodoItemId: number;
}

const initialState: TodoItemStorageState = {
	todoItemStorage: [],
	currentTodoItemId: 0,
};

export const TodoItemContext = createContext<{
	todoItemStorageState: TodoItemStorageState;
	todoItemStorageDispatch: Dispatch<TodoItemAction>;
}>({
	todoItemStorageState: initialState,
	todoItemStorageDispatch: () => null,
});
