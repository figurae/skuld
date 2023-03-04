import { useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
	Body,
	Header,
	Footer,
	TodoListSelector,
	TodoList,
	TodoItemDetails,
} from 'features';
import {
	// TODO: if this remains unused, consider not using context for this at all.
	// AppContext,
	AppProps,
	StorageContext,
	StorageProps,
	TodoItemContext,
	TodoListContext,
} from 'contexts';
import { todoItemReducer, todoListReducer } from 'reducers';
import { initializeStorageState } from 'utils';

function App() {
	const appContext: AppProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
	};

	// TODO: consider moving this to env
	const storageContext: StorageProps = {
		todoItemStorageKey: 'skuld-todo-items',
		todoListStorageKey: 'skuld-todo-lists',
	};

	const [initialTodoItemStorageState, initialTodoListStorageState] =
		initializeStorageState(storageContext);

	const [todoItemStorageState, todoItemStorageDispatch] = useReducer(
		todoItemReducer,
		initialTodoItemStorageState
	);

	const [todoListStorageState, todoListStorageDispatch] = useReducer(
		todoListReducer,
		initialTodoListStorageState
	);

	// OPTIMIZE: rearrange providers so that they are used only when required
	return (
		<>
			<StorageContext.Provider value={storageContext}>
				<TodoItemContext.Provider
					value={{ todoItemStorageState, todoItemStorageDispatch }}
				>
					<TodoListContext.Provider
						value={{ todoListStorageState, todoListStorageDispatch }}
					>
						<Body>
							<Header appName={appContext.appName} />
							<TodoListSelector />
							<Routes>
								<Route path='/' element={<Navigate to='/all' />} />
								<Route path='/all' element={<TodoList />} />
								<Route path='/:todoListId' element={<TodoList />} />
								<Route
									path='/:todoListId/:todoItemId'
									element={<TodoItemDetails />}
								/>
							</Routes>
						</Body>
					</TodoListContext.Provider>
				</TodoItemContext.Provider>
			</StorageContext.Provider>

			<Footer appVersion={appContext.appVersion} />
		</>
	);
}

export default App;
