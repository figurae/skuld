import './TodoListContent.css';

function TodoListContent(props) {
	return (
		<div className='todo-list-content'>
			{props.children}
		</div>
	);
}

export default TodoListContent;