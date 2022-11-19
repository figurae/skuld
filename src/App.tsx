import './App.css';
import Main from 'components/Main';
import Header from 'components/app/Header';
import Footer from 'components/app/Footer';
import { AppContext, AppContextProps } from './contexts/AppContext';
import { getTags } from 'components/tagmenu/TagMenu';

function App() {
	// TODO: split AppContext
	// TODO: introduce reducers
	const appContext: AppContextProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
		todoStorageKey: 'skuld-items',
		tagStorageKey: 'skuld-tags',
		tagStorage: [],
		currentTagId: 0,
	};

	appContext.tagStorage = getTags(appContext.tagStorageKey);
	if (appContext.tagStorage.length > 0) {
		appContext.currentTagId =
			appContext.tagStorage[appContext.tagStorage.length - 1].tagId + 1;
	}
	return (
		<AppContext.Provider value={appContext}>
			<Header></Header>
			<Main></Main>
			<Footer></Footer>
		</AppContext.Provider>
	);
}

export default App;
