// TODO: check ReactElement/JSX.Element (vs ReactNode)
// TODO: add tags
// TODO: add deadline
// TODO: add reordering
// TODO: add confirmation when deleting/clearing
// TODO: add undo
// TODO: add sorting by number/name/deadline
// TODO: validation, duplicates (+ double check all null checks)
// TODO: refactor adding new todos so that it doesn't add elements directly
// TODO: refactor todo and tag handling to be more analogous
// TODO: think about moving most things from here to a separate file
// TODO: graphic design
// TODO: make it reactive

import React, { ReactNode } from 'react';
import 'css/List.css';
import ListInterface from 'components/list/ListInterface';
import Item from 'components/item/Item';
import { StorageContext } from 'contexts/storage-context';
import { ItemData } from 'contexts/item-context';
import { setInLocalStorage, getFromLocalStorage } from 'helpers/local-storage';

interface ListProps {
	name: string;
}

interface TodoListState {
	// this is the final todoList array containing JSX used for rendering
	listNodes: Array<ReactNode>;
	currentItemId: number;
	tagMenu: {
		state: boolean;
		itemId: number;
	};
}

class List extends React.Component<ListProps, TodoListState> {
	static contextType = StorageContext;
	context!: React.ContextType<typeof StorageContext>;

	// this is the todoList saved in localStorage, pure data without JSX
	listStorage: Array<ItemData> = [];

	constructor(props: ListProps) {
		super(props);
		this.state = {
			listNodes: [],
			currentItemId: 0,
			tagMenu: { state: false, itemId: 0 },
		};
	}

	componentDidMount() {
		// create a todoList from stored todos
		const listNodes: Array<ReactNode> = [];

		this.listStorage = getFromLocalStorage(
			this.context?.itemStorageKey as string
		);

		if (this.listStorage !== null) {
			for (const item of this.listStorage) {
				listNodes.push(this.convertItemToNode(item));
			}

			this.setState({
				currentItemId: this.listStorage[this.listStorage.length - 1].itemId + 1,
			});
		} else {
			this.listStorage = [];
		}

		this.setState({
			listNodes: listNodes,
		});
	}

	addTodo = (todoName: string) => {
		const date = new Date();

		const newItem: ItemData = {
			itemId: this.state.currentItemId,
			itemName: todoName,
			itemCreated: date,
			itemProgress: 0,
		};

		this.setState(
			// TODO: add validation and stuff

			// append new todo to the current list of ReactNodes
			(prevState) => ({
				listNodes: [...prevState.listNodes, this.convertItemToNode(newItem)],
			}),
			// ... and add it to storage as well
			() => {
				this.setState((prevState) => ({
					currentItemId: prevState.currentItemId + 1,
				}));

				this.listStorage.push(newItem);

				setInLocalStorage(
					this.context?.itemStorageKey as string,
					this.listStorage
				);
			}
		);
	};

	editItem = (itemId: number, newItemName: string) => {
		this.listStorage.map((item) => {
			if (item.itemId === itemId) {
				item.itemName = newItemName;
			}
		});
	};

	deleteItem = (itemId: number) => {
		this.setState(
			{
				listNodes: this.state.listNodes.filter((item: ReactNode) => {
					if (React.isValidElement(item)) {
						return item.props.item.itemId !== itemId;
					}
				}),
			},
			() => {
				this.listStorage = this.listStorage.filter((item: ItemData) => {
					return item.itemId !== itemId;
				});

				if (this.listStorage.length === 0) {
					this.clearList();
					return;
				}

				setInLocalStorage(
					this.context?.itemStorageKey as string,
					this.listStorage
				);
			}
		);
	};

	clearList = () => {
		this.setState(
			{
				listNodes: [],
				currentItemId: 0,
			},
			() => {
				this.listStorage = [];
				localStorage.clear();
			}
		);
	};

	// OPTIMIZE: think about generalizing to-node conversion
	convertItemToNode(item: ItemData): ReactNode {
		return (
			<Item
				key={item.itemId}
				item={item}
				editItem={this.editItem}
				deleteItem={this.deleteItem}
			></Item>
		);
	}

	render() {
		return (
			<article className='list'>
				<ListInterface
					name={this.props.name}
					addTodo={this.addTodo}
					clearList={this.clearList}
				></ListInterface>
				<div className='list-content'>{this.state.listNodes}</div>
			</article>
		);
	}
}

export default List;
