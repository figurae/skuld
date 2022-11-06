import './App.css';
import Header from './Header';
import TodoContainer from './TodoContainer';
import Footer from './Footer';
import { AppContext } from './AppContext';

function App() {
	const appContext = {
		appName: 'skuld.js',
		appVersion: '0.1.0',
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
