// TODO: make helpers for localstorage and todo management.

import './TodoList.css';
import TodoItem, { TodoItemData } from './TodoItem';
import TodoListContent from './TodoListContent';
import TodoListHeader from './TodoListHeader';
import React, { ReactNode } from 'react';
import { AppContext } from './AppContext';

interface TodoListProps {
	todoListName: string;
}

interface TodoListState {
	todoList: Array<ReactNode>;
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
	static contextType = AppContext;
	context!: React.ContextType<typeof AppContext>;

	keyNo = 0;
	todoListStorage: Array<TodoItemData> = [];

	constructor(props: TodoListProps) {
		super(props);
		this.state = { todoList: [] };
	}

	componentDidMount() {
		const todoListNodes: Array<ReactNode> = [];

		this.todoListStorage = JSON.parse(
			localStorage.getItem(this.context?.storageKey as string) as string
		);

		if (this.todoListStorage !== null) {
			for (const item of this.todoListStorage) {
				todoListNodes.push(this.convertItemToNode(item));
			}
		} else {
			this.todoListStorage = [];
		}

		this.setState({ todoList: todoListNodes });
	}

	addTodo = () => {
		const name = 'dis be todo no. ' + this.keyNo;
		const date = new Date().toLocaleString('gb-GB');

		const newTodoItem: TodoItemData = {
			todoItemId: this.keyNo,
			todoItemName: name,
			todoItemCreated: date,
		};

		this.setState(
			(prevState) => ({
				todoList: [...prevState.todoList, this.convertItemToNode(newTodoItem)],
			}),
			() => {
				this.keyNo++;
				this.todoListStorage.push(newTodoItem);
				localStorage.setItem(
					this.context?.storageKey as string,
					JSON.stringify(this.todoListStorage)
				);
			}
		);
	};

	deleteTodoItem = (todoItemId: number) => {
		this.setState(
			{
				todoList: this.state.todoList.filter((item: ReactNode) => {
					if (React.isValidElement(item)) {
						return item.props.todoItem.todoItemId !== todoItemId;
					}
				}),
			},
			() => {
				this.todoListStorage = this.todoListStorage.filter(
					(item: TodoItemData) => {
						return item.todoItemId !== todoItemId;
					}
				);

				localStorage.setItem(
					this.context?.storageKey as string,
					JSON.stringify(this.todoListStorage)
				);
			}
		);
	};

	clearTodoList = () => {
		this.setState({
			todoList: [],
		});

		localStorage.clear();
	};

	convertItemToNode(item: TodoItemData): ReactNode {
		return (
			<TodoItem
				key={item.todoItemId}
				todoItem={item}
				deleteTodoItem={this.deleteTodoItem}
			></TodoItem>
		);
	}

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
