import './TodoDetails.css';

function TodoDetails(props) {
	return (
		<aside className='todo-details'>
			<h1>here be todo details!11!</h1>
			{props.children}
		</aside>
	);
}

export default TodoDetails;