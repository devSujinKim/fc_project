import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from '../components/Link';

const TodoList = () => {
  const ref = useRef(null);
  const [todoItem, setTodoItem] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editTodoItem, setEditTodoItem] = useState([]);

  const TodosData = async () => {
    const response = await axios.get('http://localhost:4000/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    TodosData();
  }, []);

  const onCreate = async (id) => {
    const response = await axios
      .post(`http://localhost:4000/todos/`, {
        id: id++,
        text: todoItem,
      })
      .then((res) => {
        const newTodos = [...todos, res.data];
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRemove = async (id) => {
    const response = await axios
      .delete(`http://localhost:4000/todos/${id}`)
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={todoItem}
          placeholder="할일을 입력해 주세요!"
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button onClick={onCreate}>등록</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.text}</Link>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
