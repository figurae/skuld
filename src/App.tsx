import './App.css';
import Header from './Header';
import TodoContainer from './TodoContainer';
import Footer from './Footer';
import { AppContext, IAppContext } from './AppContext';

function App() {
	const appContext: IAppContext = {
		appName: 'skuld',
		appVersion: '0.1.0',
		storageKey: 'skuld-storage',
	};

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
