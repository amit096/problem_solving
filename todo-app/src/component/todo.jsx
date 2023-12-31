

export default function TodoList({ todos, onCompleted }) {
    function completedOnclick(todo) {
        onCompleted(todo);
    }
    if (todos.length > 0) {
        return (
            <div> <h1>Todos</h1>
                {todos.map((todo) => (
                    (<div key={todo._id}>
                        <h2>{todo.title}</h2>
                        <h3>{todo.description}</h3>
                        {todo.completed ? <button>completed</button> :
                            <button onClick={() => completedOnclick(todo)} >complete</button>
                        }
                    </div>)
                ))}
            </div>
        );
    }
}
