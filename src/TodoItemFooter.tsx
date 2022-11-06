import { ReactNode } from 'react';
import './TodoItemFooter.css';

// TODO: this should not require this...
interface ITodoItemFooter {
	children: ReactNode;
}

function TodoItemFooter(props: ITodoItemFooter) {
	return <div className='todo-item-footer'>{props.children}</div>;
}

export default TodoItemFooter;
