import { ReactNode } from "react";
import "./TodoItemContent.css";

interface ITodoItemContent {
  children: ReactNode;
}

function TodoItemContent(props: ITodoItemContent) {
  return <div className="todo-item-content">{props.children}</div>;
}

export default TodoItemContent;
