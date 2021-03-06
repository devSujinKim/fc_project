import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/url';

axios.defaults.baseURL = BASE_URL;

interface Todo {
  id: number;
  text: string;
}

let todoItemId = 0;

const TodoList = () => {
  const [todoItem, setTodoItem] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const TodosData = async (): Promise<void> => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    TodosData();
  }, []);

  const onCreate = async (): Promise<void> => {
    if (todoItem && todoItem !== '') {
      await axios
        .post(`/todos`, {
          id: todoItemId++,
          text: todoItem,
        })
        .then((res) => {
          const newTodos = [...todos, res.data];
          setTodos(newTodos);
          setTodoItem('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('할일을 입력해 주세요.');
    }
  };

  const onRemove = async (id: number): Promise<void> => {
    await axios
      .delete(`/todos/${id}`)
      .then(() => {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoItem(e.target.value)
          }
        />
        <button onClick={onCreate}>등록</button>
      </div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>{todo.text}</a>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
