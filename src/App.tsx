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
            <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-800 px-2 sm:px-4 md:px-8 lg:px-24 xl:px-40 2xl:px-60 text-white">
                <header className="sticky top-0 z-50 py-6 bg-gradient-to-br from-gray-800 to-gray-800/90 backdrop-blur-md w-full">
                    <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            Todoroki
                        </h1>
                        <button
                            className="rounded-md bg-gray-300 px-4 py-2 text-xs sm:text-sm text-black font-bold transition hover:bg-gray-100 hover:-translate-y-1 hover:scale-110 duration-300 ease-in-out"
                            onClick={() =>
                                inputRef.current && inputRef.current.focus()
                            }
                        >
                            New Task
                        </button>
                    </div>
                </header>
                <div className="p-2 sm:p-4 md:p-6">
                    <div
                        className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto rounded-md bg-white/10 p-2 sm:p-4 md:p-6"
                        data-testid="list"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
                            Todo List
                        </h2>
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className="flex flex-row items-center text-white font-bold rounded-md px-2 sm:px-4 py-2 mb-2 sm:mb-4"
                                >
                                    <input
                                        type="checkbox"
                                        id={todo.id.toString()}
                                        checked={todo.completed}
                                        onChange={() =>
                                            handleToggleTodo(todo.id)
                                        }
                                        className="mr-2 sm:mr-4 h-6 w-6"
                                    />
                                    <label
                                        className={`flex-1 mr-0 sm:mr-2 text-lg sm:text-2xl ${todo.completed ? "line-through" : ""}`}
                                        htmlFor={todo.id.toString()}
                                    >
                                        {todo.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white font-bold text-lg sm:text-2xl">
                                タスクがありません。追加してください！
                            </p>
                        )}
                        <div className="mt-4 sm:mt-6">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={title}
                                    placeholder="What needs to be done?"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full sm:w-2/3 rounded-md px-4 py-2 text-black bg-white"
                                />

                                <button
                                    type="submit"
                                    onClick={handleAddTodo}
                                    className="rounded-md bg-gray-300 sm:ml-4 px-4 py-2 text-xs sm:text-sm text-black font-bold transition hover:bg-gray-100 hover:-translate-y-1 hover:scale-110 duration-300 ease-in-out"
                                >
                                    + New Task
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 text-right text-8xl md:text-9xl font-bold pointer-events-none select-none">
                        <h2>TODOROKI</h2>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
