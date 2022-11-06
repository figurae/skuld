import "./TodoContainer.css";
import TodoListSelector from "./TodoListSelector";
import TodoList from "./TodoList";
import TodoDetails from "./TodoDetails";

function TodoContainer() {
  return (
    <main className="todo-container">
      <TodoListSelector></TodoListSelector>
      <TodoList todoListName={"todo list name"}></TodoList>
      <TodoDetails></TodoDetails>
    </main>
  );
}

export default TodoContainer;
