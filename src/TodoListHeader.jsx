import './TodoListHeader.css';

function TodoListHeader(props) {
	return (
		<div className='todo-list-header'>
			{ props.children }
		</div>
	);
}

export default TodoListHeader;