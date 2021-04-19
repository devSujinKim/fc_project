import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const TodoDetail = () => {
  const [todoDetail, setTodoDetail] = useState('');
  const [text, setText] = useState([]);
  const [comments, setComments] = useState([]);

  const router = useRouter();
  const id = router.query.id;
  const todoId = router.query.todoId;

  const TodoData = async () => {
    const todos = await axios.get(`http://localhost:4000/todos/${id}`);
    setTodoDetail(todos.data.text);
    const comments = (await axios.get(`http://localhost:4000/comments/`)).data;
    const curComments = comments.filter((comment) => comment.todoId === id);
    setComments(curComments);
  };

  useEffect(() => {
    TodoData();
  }, [router]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onCreate = async (commentId) => {
    const response = await axios
      .post(`http://localhost:4000/comments`, {
        id: commentId++,
        todoId: id,
        text: text,
      })
      .then((res) => {
        const newComments = [...comments, res.data];
        setComments(newComments);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          {todoDetail}
        </Typography>
        <div>
          <input value={text} onChange={onChange} />
          <button onClick={onCreate}>등록</button>
        </div>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default TodoDetail;
