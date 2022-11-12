/* localStorage data structure:
		key: skuld-todos
	todoItemId: number
	todoItemName: string
	todoItemDescription?: string
	todoItemCreated: Date
	todoItemEdited?: Date
	todoItemCompleted?: Date
	todoItemProgress: number
	todoItemTags?: Array<number>
		key: skuld-tags
	todoTagId: number
	todoTagName: string
	todoTagItems?: Array<number> */
// TODO: check ReactElement/JSX.Element (vs ReactNode)
// TODO: add tags
// TODO: validation
// TODO: refactor adding new todos so that it doesn't add elements directly
// TODO: think about moving everything here to a separate file

import './TodoList.css';
import TodoItem, { TodoItemData } from './TodoItem';
import TodoListContent from './TodoListContent';
import TodoListHeader from './TodoListHeader';
import React, { ReactNode } from 'react';
import { AppContext } from './AppContext';
import { setInLocalStorage, getFromLocalStorage } from 'LocalStorageHelper';

interface TodoListProps {
	todoListName: string;
}

interface TodoListState {
	// this is the final todoList array containing JSX used for rendering
	todoList: Array<ReactNode>;
	currentTodoItemId: number;
	tagMenu: {
		state: boolean;
		todoItemId: number;
	};
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
	static contextType = AppContext;
	context!: React.ContextType<typeof AppContext>;

	// this is the todoList saved in localStorage, pure data without JSX
	todoListStorage: Array<TodoItemData> = [];

	constructor(props: TodoListProps) {
		super(props);
		this.state = {
			todoList: [],
			currentTodoItemId: 0,
			tagMenu: { state: false, todoItemId: 0 },
		};
	}

	componentDidMount() {
		// create a todoList from stored todos
		const todoListNodes: Array<ReactNode> = [];

		this.todoListStorage = getFromLocalStorage(
			this.context?.storageKey as string
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

	addTodo = (todoName: string) => {
		const date = new Date();

		const newTodoItem: TodoItemData = {
			todoItemId: this.state.currentTodoItemId,
			todoItemName: todoName,
			todoItemCreated: date,
			todoItemProgress: 0,
		};

		this.setState(
			// TODO: add validation and stuff
			// append new todo to the current list of ReactNodes
			(prevState) => ({
				todoList: [...prevState.todoList, this.convertItemToNode(newTodoItem)],
			}),
			// ... and add it to storage as well
			() => {
				this.setState((prevState) => ({
					currentTodoItemId: prevState.currentTodoItemId + 1,
				}));

				this.todoListStorage.push(newTodoItem);

				setInLocalStorage(
					this.context?.storageKey as string,
					this.todoListStorage
				);
			}
		);
	};

	editTodoItem = (todoItemId: number, newTodoItemName: string) => {
		this.todoListStorage.map((item) => {
			if (item.todoItemId === todoItemId) {
				item.todoItemName = newTodoItemName;
			}
		});
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

				setInLocalStorage(
					this.context?.storageKey as string,
					this.todoListStorage
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

	// TODO: this doesn't seem like a good place for this or its JSX;
	// maybe pass it through context from App or a new file?
	openTagMenu = (todoItemId: number) => {
		this.setState({ tagMenu: { state: true, todoItemId: todoItemId } });
	};

	convertItemToNode(item: TodoItemData): ReactNode {
		return (
			<TodoItem
				key={item.todoItemId}
				todoItem={item}
				editTodoItem={this.editTodoItem}
				deleteTodoItem={this.deleteTodoItem}
			></TodoItem>
		);
	}

	render() {
		return (
			<>
				<article className='todo-list'>
					<TodoListHeader
						todoListName={this.props.todoListName}
						addTodo={this.addTodo}
						clearTodoList={this.clearTodoList}
					></TodoListHeader>
					<TodoListContent>{this.state.todoList}</TodoListContent>
				</article>
			</>
		);
	}
}

export default TodoList;
