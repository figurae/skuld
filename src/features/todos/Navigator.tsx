import { Route, Routes, Navigate } from 'react-router-dom';
import './Navigator.css';
import Selector from 'features/todos/Selector';
import List from 'features/todos/List';
import Details from 'features/todos/Details';

function Navigator() {
	return (
		<main className='navigator'>
			<Selector />
			<Routes>
				<Route path='/' element={<Navigate to='/all' />} />
				<Route path='/all' element={<List />} />
				<Route path='/:tagId' element={<List />} />
				<Route path='/:tagId/:itemId' element={<Details />} />
			</Routes>
		</main>
	);
}

export default Navigator;
