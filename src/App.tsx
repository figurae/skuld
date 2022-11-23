// TODO: add deadline
// TODO: add reordering
// TODO: add confirmation when deleting/clearing
// TODO: add undo
// TODO: add sorting by number/name/deadline
// TODO: validation, duplicates (+ double check all null checks)
// TODO: graphic design
// TODO: make it reactive

import { useReducer } from 'react';
import 'css/App.css';
import Navigator from 'components/Navigator';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import { AppContext, AppProps } from 'contexts/app-context';
import { StorageContext, StorageProps } from 'contexts/storage-context';
import { ItemContext } from 'contexts/item-context';
import { TagContext } from 'contexts/tag-context';
import { itemReducer } from 'reducers/item-reducer';
import { tagReducer } from 'reducers/tag-reducer';
import { initializeStorageState } from 'helpers/initialization';

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
