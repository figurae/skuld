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
	tagId: number
	tagName: string
	tagTodos?: Array<number> */
// TODO: check ReactElement/JSX.Element (vs ReactNode)
// TODO: add tags
// TODO: add reordering
// TODO: add confirmation when deleting/clearing
// TODO: add undo
// TODO: validation, duplicates (+ double check all null checks)
// TODO: refactor adding new todos so that it doesn't add elements directly
// TODO: refactor todo and tag handling to be more analogous
// TODO: think about moving everything here to a separate file
// TODO: graphic design
// TODO: make it reactive

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
	todoListNodes: Array<ReactNode>;
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
			todoListNodes: [],
			currentTodoItemId: 0,
			tagMenu: { state: false, todoItemId: 0 },
		};
	}

	componentDidMount() {
		// create a todoList from stored todos
		const todoListNodes: Array<ReactNode> = [];

		this.todoListStorage = getFromLocalStorage(
			this.context?.todoListKey as string
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
			todoListNodes: todoListNodes,
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
				todoListNodes: [
					...prevState.todoListNodes,
					this.convertItemToNode(newTodoItem),
				],
			}),
			// ... and add it to storage as well
			() => {
				this.setState((prevState) => ({
					currentTodoItemId: prevState.currentTodoItemId + 1,
				}));

				this.todoListStorage.push(newTodoItem);

				setInLocalStorage(
					this.context?.todoListKey as string,
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
				todoListNodes: this.state.todoListNodes.filter((item: ReactNode) => {
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
					this.context?.todoListKey as string,
					this.todoListStorage
				);
			}
		);
	};

	clearTodoList = () => {
		this.setState(
			{
				todoListNodes: [],
				currentTodoItemId: 0,
			},
			() => {
				this.todoListStorage = [];
				localStorage.clear();
			}
		);
	};

	// OPTIMIZE: think about generalizing to-node conversion
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
			<article className='todo-list'>
				<TodoListHeader
					todoListName={this.props.todoListName}
					addTodo={this.addTodo}
					clearTodoList={this.clearTodoList}
				></TodoListHeader>
				<TodoListContent>{this.state.todoListNodes}</TodoListContent>
			</article>
		);
	}
}

export default TodoList;
