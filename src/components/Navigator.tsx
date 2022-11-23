import { Route, Routes, Navigate } from 'react-router-dom';
import 'css/Navigator.css';
import Selector from 'components/Selector';
import List from 'components/List';
import Details from 'components/Details';

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
