/* localStorage data structure:
		key: skuld-todos
	todoItemId: number
	todoItemName: string
	todoItemDescription?: string
	todoItemCreated: Date
	todoItemCompleted?: Date
	todoItemProgress: number
	todoItemTags?: Array<number>
		key: skuld-tags
	todoTagId: number
	todoTagName: string
	todoTagItems?: Array<number> */
// TODO: make helpers for localstorage and todo management.
// TODO: check ReactElement/JSX.Element (vs ReactNode)
// TODO: add input for new todos
// TODO: add todo editing
// TODO: add tags

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
	currentTodoItemId: number;
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
	static contextType = AppContext;
	context!: React.ContextType<typeof AppContext>;

	todoListStorage: Array<TodoItemData> = [];

	constructor(props: TodoListProps) {
		super(props);
		this.state = { todoList: [], currentTodoItemId: 0 };
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

			this.setState({
				currentTodoItemId:
					this.todoListStorage[this.todoListStorage.length - 1].todoItemId + 1,
			});
		} else {
			this.todoListStorage = [];
		}

		this.setState({
			todoList: todoListNodes,
		});
	}

	addTodo = () => {
		const name = 'dis be todo no. ' + this.state.currentTodoItemId;
		const date = new Date();

		const newTodoItem: TodoItemData = {
			todoItemId: this.state.currentTodoItemId,
			todoItemName: name,
			todoItemCreated: date,
			todoItemProgress: 0,
		};

		this.setState(
			(prevState) => ({
				todoList: [...prevState.todoList, this.convertItemToNode(newTodoItem)],
			}),
			() => {
				this.setState((prevState) => ({
					currentTodoItemId: prevState.currentTodoItemId + 1,
				}));
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

				if (this.todoListStorage.length === 0) {
					this.clearTodoList();
					return;
				}

				localStorage.setItem(
					this.context?.storageKey as string,
					JSON.stringify(this.todoListStorage)
				);
			}
		);
	};

	clearTodoList = () => {
		this.setState(
			{
				todoList: [],
				currentTodoItemId: 0,
			},
			() => {
				this.todoListStorage = [];
				localStorage.clear();
			}
		);
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
