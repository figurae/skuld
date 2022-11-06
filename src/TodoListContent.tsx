import "./TodoListContent.css";

interface ITodoListContentProps {
  children: Array<JSX.Element>;
}

function TodoListContent(props: ITodoListContentProps) {
  return <div className="todo-list-content">{props.children}</div>;
}

export default TodoListContent;
