import { useState, useRef } from "react";
import "./App.css";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

function App() {
    const [title, setTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
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
            <main className="min-h-screen min-w-screen bg-gradient-to-br from-gray-800 to-gray-800 px-50 text-white">
                <head>
                    <title>Todoroki</title>
                    <meta name="description" content="A simple todo app" />
                </head>
                <header className="sticky items-center top-0 z-50 py-10">
                    <div className="hidden w-full gap-5 lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-[109px] w-full">
                            <h1 className="text-4xl font-bold text-white">
                                Todoroki
                            </h1>
                            <button
                                className="rounded-md bg-gray-300 px-4 py-2 text-sm text-black font-bold transition hover:bg-gray-100 hover:-translate-y-1 hover:scale-110 duration-300 ease-in-out"
                                onClick={() =>
                                    inputRef.current && inputRef.current.focus()
                                }
                            >
                                New Task
                            </button>
                        </div>
                    </div>
                </header>
                <div className="p-6">
                    <div
                        className="w-1/2 mx-auto rounded-md bg-white/10 p-6"
                        data-testid="list"
                    >
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className="flex items-center text-white font-bold rounded-md px-4 py-2 mb-4"
                                >
                                    <input
                                        type="checkbox"
                                        id={todo.id.toString()}
                                        checked={todo.completed}
                                        onChange={() =>
                                            handleToggleTodo(todo.id)
                                        }
                                        className="mr-4 h-6 w-6"
                                    />
                                    <label
                                        className={`w-full mr-2 text-2xl ${todo.completed ? "line-through" : ""}`}
                                        htmlFor={todo.id.toString()}
                                    >
                                        {todo.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white font-bold text-2xl">
                                タスクがありません。追加してください！
                            </p>
                        )}
                        <div className="mt-6">
                            <div className="flex">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={title}
                                    placeholder="What needs to be done?"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-2/3 rounded-md px-4 py-2 text-black bg-white"
                                />

                                <button
                                    type="submit"
                                    onClick={handleAddTodo}
                                    className="rounded-md bg-gray-300 ml-4 px-4 py-2 text-sm text-black font-bold transition hover:bg-gray-100 hover:-translate-y-1 hover:scale-110 duration-300 ease-in-out"
                                >
                                    + New Task
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-4 right-4 text-right text-9xl font-bold">
                        <h2>TODOROKI</h2>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
