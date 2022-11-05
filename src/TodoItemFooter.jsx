import './TodoItemFooter.css';

function TodoItemFooter(props) {
	return (
		<div className='todo-item-footer'>
			{ props.children }
		</div>
	);
}

export default TodoItemFooter;