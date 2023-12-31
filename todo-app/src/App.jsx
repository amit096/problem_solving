
import './App.css'
import CreateTodo from './component/createtodo';
import TodoList from './component/todo';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(async () => {
    let res = await axios.get('http://localhost:3000/todos');
    let todoList = res.data.todo;
    setTodo(todoList);
  }, []);

  async function onCompleted(todo) {
    let todoId = {
      id: todo._id
    };
    await axios.put('http://localhost:3000/completed', todoId);
    let res = await axios.get('http://localhost:3000/todos');
    let todoList = res.data.todo;
    setTodo(todoList);
  }

  async function addTodo(title, description) {
    let newTodo = {
      title: title,
      description: description
    };

    await axios.post('http://localhost:3000/todo', newTodo);
    let res = await axios.get('http://localhost:3000/todos');
    let todoList = res.data.todo;
    setTodo(todoList);
  }

  return (
    <>
      <CreateTodo addTodo={addTodo} />
      <div>
        <TodoList todos={todo} onCompleted={onCompleted} />
      </div>
    </>
  )
}

export default App
