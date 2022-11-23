import 'css/Navigator.css';
import Selector from 'components/Selector';
import List from 'components/List';
import Details from 'components/Details';
import { Route, Routes } from 'react-router-dom';

function Navigator() {
	return (
		<main className='navigator'>
			<Selector />
			<Routes>
				<Route path='/' element={<h1>replace me</h1>} />
				<Route path='/all' element={<List name='all items' />} />
				<Route path='/:tagId' element={<List name='FIXME: DELETE ME' />} />
				<Route path='/:tagId/:itemId' element={<Details />} />
			</Routes>
		</main>
	);
}

export default Navigator;
