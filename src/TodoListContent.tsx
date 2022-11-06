import { ReactNode } from 'react';
import './TodoListContent.css';

interface TodoListContentProps {
	children: ReactNode;
}

function TodoListContent(props: TodoListContentProps) {
	return <div className='todo-list-content'>{props.children}</div>;
}

export default TodoListContent;
