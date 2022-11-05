import './TodoListSelector.css';

function TodoListSelector(props) {
	return (
		<aside className='todo-list-selector'>
			<h1 className='text-center'>here be selector!11</h1>
			{ props.children }
		</aside>
	);
}

export default TodoListSelector;