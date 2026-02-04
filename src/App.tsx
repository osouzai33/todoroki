import { useState } from "react";
import "./App.css";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

function App() {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            title: "Learn English",
            completed: false,
        },
        {
            id: 2,
            title: "Practice Golf",
            completed: true,
        },
        {
            id: 3,
            title: "Read Books",
            completed: false,
        },
    ]);

    const handleAddTodo = (e: React.MouseEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                title: title,
                completed: false,
            },
        ]);
        setTitle("");
    };

    const handleToggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) => {
                return todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo;
            }),
        );
    };

    return (
        <>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <span>{todo.title}</span>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                        />
                    </div>
                ))}
                <input
                    type="text"
                    value={title}
                    placeholder="New Todo"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit" onClick={handleAddTodo}>
                    Add Todo
                </button>
            </div>
        </>
    );
}

export default App;
