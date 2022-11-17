import './App.css';
import Header from './Header';
import TodoContainer from './TodoContainer';
import Footer from './Footer';
import { AppContext, AppContextProps } from './AppContext';
import { getTags } from 'TagMenu';

function App() {
	const appContext: AppContextProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
		todoListKey: 'skuld-todos',
		tagListKey: 'skuld-tags',
		tagListStorage: [],
		currentTagId: 0,
	};

	appContext.tagListStorage = getTags(appContext.tagListKey);
	if (appContext.tagListStorage.length > 0) {
		appContext.currentTagId =
			appContext.tagListStorage[appContext.tagListStorage.length - 1].tagId + 1;
	}
	return (
		<>
			<AppContext.Provider value={appContext}>
				<Header></Header>
				<TodoContainer></TodoContainer>
				<Footer></Footer>
			</AppContext.Provider>
		</>
	);
}

export default App;
