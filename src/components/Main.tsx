import './Main.css';
import Selector from './selector/Selector';
import List from './list/List';
import Details from './details/Details';

function Main() {
	return (
		<main className='main'>
			<Selector></Selector>
			<List name={'todo list name'}></List>
			<Details></Details>
		</main>
	);
}

export default Main;
