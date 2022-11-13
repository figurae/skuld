import './App.css';
import Header from './Header';
import TodoContainer from './TodoContainer';
import Footer from './Footer';
import { AppContext, AppContextProps } from './AppContext';
import { loadTags } from 'TagMenu';

function App() {
	const appContext: AppContextProps = {
		appName: 'skuld',
		appVersion: '0.1.0',
		todoListKey: 'skuld-todos',
		tagListKey: 'skuld-tags',
		tagListStorage: null,
	};

	loadTags(appContext);

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
