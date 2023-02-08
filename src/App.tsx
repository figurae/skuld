import { useReducer } from 'react';
import { Navigator, Header, Footer } from 'features';
import {
	AppContext,
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
			<AppContext.Provider value={appContext}>
				<Header />
			</AppContext.Provider>
			<StorageContext.Provider value={storageContext}>
				<TagContext.Provider value={{ tagStorageState, tagStorageDispatch }}>
					<ItemContext.Provider
						value={{ itemStorageState, itemStorageDispatch }}
					>
						<Navigator />
					</ItemContext.Provider>
				</TagContext.Provider>
			</StorageContext.Provider>
			<AppContext.Provider value={appContext}>
				<Footer />
			</AppContext.Provider>
		</>
	);
}

export default App;
