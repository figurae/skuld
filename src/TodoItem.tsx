import "./TodoItem.css";
import TodoItemContent from "./TodoItemContent";
import TodoItemFooter from "./TodoItemFooter";

interface ITodoItemProps {
  todoId: number;
  deleteTodo: (todoId: number) => void;
  todoItemName: string;
  todoItemCreated: string;
}

function TodoItem(props: ITodoItemProps) {
  return (
    <article className="todo-item">
      <TodoItemContent>
        <button type="button" onClick={() => props.deleteTodo(props.todoId)}>
          X
        </button>
        <p>{props.todoItemName}</p>
      </TodoItemContent>
      <TodoItemFooter>
        <p>added on: {props.todoItemCreated}</p>
      </TodoItemFooter>
    </article>
  );
}

export default TodoItem;
