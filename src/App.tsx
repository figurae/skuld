import { useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
	Body,
	Header,
	Footer,
	TodoListSelector,
	TodoList,
	TodoDetails,
} from 'features';
import {
	// TODO: if this remains unused, consider not using context for this at all.
	// AppContext,
	AppProps,
	StorageContext,
	StorageProps,
	ItemContext,
	TagContext,
} from 'contexts';
import { itemReducer, tagReducer } from 'reducers';
import { initializeStorageState } from 'utils';

function App() {
	const appContext: AppProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
	};

	// TODO: consider moving this to env
	const storageContext: StorageProps = {
		itemStorageKey: 'skuld-items',
		tagStorageKey: 'skuld-tags',
	};

	const [initialItemStorageState, initialTagStorageState] =
		initializeStorageState(storageContext);

	const [itemStorageState, itemStorageDispatch] = useReducer(
		itemReducer,
		initialItemStorageState
	);

	const [tagStorageState, tagStorageDispatch] = useReducer(
		tagReducer,
		initialTagStorageState
	);

	// OPTIMIZE: rearrange providers so that they are used only when required
	return (
		<>
			<StorageContext.Provider value={storageContext}>
				<ItemContext.Provider value={{ itemStorageState, itemStorageDispatch }}>
					<TagContext.Provider value={{ tagStorageState, tagStorageDispatch }}>
						<Body>
							<Header appName={appContext.appName} />
							<TodoListSelector />
							<Routes>
								<Route path='/' element={<Navigate to='/all' />} />
								<Route path='/all' element={<TodoList />} />
								<Route path='/:tagId' element={<TodoList />} />
								<Route path='/:tagId/:itemId' element={<TodoDetails />} />
							</Routes>
						</Body>
					</TagContext.Provider>
				</ItemContext.Provider>
			</StorageContext.Provider>

			<Footer appVersion={appContext.appVersion} />
		</>
	);
}

export default App;
