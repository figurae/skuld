import { createContext, Dispatch } from 'react';
import { TodoListAction } from 'reducers/todo-list-reducer';

export interface TodoListData {
	todoListId: number;
	todoListName: string;
	todoListItems: Array<number>;
}

export interface TodoListStorageState {
	todoListStorage: Array<TodoListData>;
	currentTodoListId: number;
}

const initialState: TodoListStorageState = {
	todoListStorage: [],
	currentTodoListId: 0,
};

export const TodoListContext = createContext<{
	todoListStorageState: TodoListStorageState;
	todoListStorageDispatch: Dispatch<TodoListAction>;
}>({
	todoListStorageState: initialState,
	todoListStorageDispatch: () => null,
});
