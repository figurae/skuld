import 'css/Main.css';
import Selector from 'components/Selector';
import List from 'components/List';
import Details from 'components/Details';

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
