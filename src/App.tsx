import 'css/App.css';
import Main from 'components/Main';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import { AppContext, AppContextProps } from 'contexts/app';
import { StorageContext, StorageProps } from 'contexts/storage';
import { getTags } from 'helpers/tag-management';

function App() {
	// TODO: split AppContext
	// TODO: introduce reducers
	const appContext: AppContextProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
	};

	const storageContext: StorageProps = {
		todoStorageKey: 'skuld-items',
		tagStorageKey: 'skuld-tags',
		tagStorage: [],
		currentTagId: 0,
	};

	storageContext.tagStorage = getTags(storageContext.tagStorageKey);
	if (storageContext.tagStorage.length > 0) {
		storageContext.currentTagId =
			storageContext.tagStorage[storageContext.tagStorage.length - 1].tagId + 1;
	}
	return (
		<>
			<AppContext.Provider value={appContext}>
				<Header />
			</AppContext.Provider>
			<StorageContext.Provider value={storageContext}>
				<Main />
			</StorageContext.Provider>
			<AppContext.Provider value={appContext}>
				<Footer />
			</AppContext.Provider>
		</>
	);
}

export default App;
