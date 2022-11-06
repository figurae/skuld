import './TodoListHeader.css';

interface ITodoListHeaderProps {
	children: Array<JSX.Element>;
}

function TodoListHeader(props: ITodoListHeaderProps) {
	return <div className='todo-list-header'>{props.children}</div>;
}

export default TodoListHeader;
