import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

const crearUsuario = () => {
fetch('https://playground.4geeks.com/todo/users/cristina', {
  method: "POST"
  }
)
.then(resp => resp.json())
.then(data => console.log(data))
.catch(error => console.log(error));

}

  useEffect(() => {
    getTodos()
  }, []);
  const getTodos = () => {
    fetch('https://playground.4geeks.com/todo/users/cristina')
  .then(resp => {
    if (resp.status === 404) {
    crearUsuario()
    }
    return resp.json()})
  .then(data => {
    setTodos(data.todos)
    console.log(data.todos)
  })
  .catch(error => console.log(error))};
 

  const deleteTodo = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method: "DELETE",
            })
      .then(resp => {
        if (resp.status === 200) {
        getTodos()
        }
        return resp.json()})
      .then(data => console.log(data))
      .catch(error => console.log(error))}
  ;
 
  const updateTodos = (newTodos) => {
    fetch('https://playground.4geeks.com/todo/todos/{todo_id}', {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setTodos(data))
    .catch(error => console.log(error));
  };

  const clearTodos = () => {
    fetch('https://playground.4geeks.com/todo/user/', {
      method: "PUT",
      body: JSON.stringify([]), 
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setTodos([]))
    .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos?.map((todo, index) => (
          <li key={index}>
            {todo.label}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => clearTodos()}>Clear All</button>
    </div>
  );
};

export default TodoApp;



      
