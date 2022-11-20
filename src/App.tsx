import { useReducer } from 'react';
import 'css/App.css';
import Main from 'components/Main';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import { AppContext, AppProps } from 'contexts/app-context';
import { StorageContext, StorageProps } from 'contexts/storage-context';
import { initializeStorageState } from 'helpers/initialization';
import { tagReducer } from 'reducers/tag-reducer';
import { TagContext } from 'contexts/tag-context';

function App() {
	// TODO: move item initialization here
	const appContext: AppProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
	};

	const storageContext: StorageProps = {
		todoStorageKey: 'skuld-items',
		tagStorageKey: 'skuld-tags',
	};

	const initialTagStorageState = initializeStorageState(storageContext);

	const [tagStorageState, tagStorageDispatch] = useReducer(
		tagReducer,
		initialTagStorageState
	);

	return (
		<>
			<AppContext.Provider value={appContext}>
				<Header />
			</AppContext.Provider>
			<StorageContext.Provider value={storageContext}>
				<TagContext.Provider value={{ tagStorageState, tagStorageDispatch }}>
					<Main />
				</TagContext.Provider>
			</StorageContext.Provider>
			<AppContext.Provider value={appContext}>
				<Footer />
			</AppContext.Provider>
		</>
	);
}

export default App;
