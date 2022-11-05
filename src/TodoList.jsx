import './TodoList.css';
import TodoItem from './TodoItem';
import TodoListContent from './TodoListContent';
import TodoListHeader from './TodoListHeader';
import React from 'react';
import { AppContext } from './AppContext';

class TodoList extends React.Component {
	static contextType = AppContext;
	storageKey = null;
	keyNo = 0;

	constructor(props) {
		super(props);
		this.state = { todoList: [] };
	}

	componentDidMount() {
		this.storageKey = this.context.appName + '-storage';

		const todoList = localStorage.getItem(this.storageKey);
		if (todoList) {
			console.log('todoList is true');
		} else {
			console.log('todoList is false')
		};

	}

	awaitableSetState = (newState) =>
		new Promise((resolve) => this.setState(newState, resolve));

	addTodo = async () => {
		const name = 'dis be todo no. ' + this.keyNo;
		const date = new Date().toLocaleString('gb-GB');

		await this.awaitableSetState((prevState) => ({
			todoList: [
				...prevState.todoList,
				<TodoItem
					key={this.keyNo}
					todoId={this.keyNo}
					todoItemName={name}
					todoItemCreated={date}
					deleteTodo={this.deleteTodo}
				></TodoItem>,
			],
		}));
		this.keyNo++;
		localStorage.setItem(this.storageKey, 'test');
	};

	deleteTodo = (todoId) => {
		this.setState({
			todoList: this.state.todoList.filter(
				(item) => item.props.todoId !== todoId
			),
		});
	};

	clearTodoList = () => {
		this.setState({
			todoList: [],
		});

		localStorage.clear();
	};

	render() {
		return (
			<article className='todo-list'>
				<TodoListHeader>
					<h1>{this.props.todoListName}</h1>
					<button
						type='button'
						className='todo-list-add-button'
						onClick={this.addTodo}
					>
						add todo
					</button>
					<button
						type='button'
						className='todo-list-clear-button'
						onClick={this.clearTodoList}
					>
						clear list
					</button>
				</TodoListHeader>
				<TodoListContent>{this.state.todoList}</TodoListContent>
			</article>
		);
	}
}

export default TodoList;
