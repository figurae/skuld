import './TodoItemContent.css';

function TodoItemContent(props) {
	return (
		<div className='todo-item-content'>
			{ props.children }
		</div>
	);
}

export default TodoItemContent;