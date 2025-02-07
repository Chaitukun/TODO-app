import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [todoDetails, setTodoDetails] = useState(null);

  async function fetchListOfTodos() {
    try {
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      console.log(result);
      if (result.todos && result.todos.length > 0) {
        setTodoList(result.todos);
        setLoading(false);
        setErrorMsg("");
      } else {
        setTodoList([]);
        setLoading(false);
        setErrorMsg("No Todos Found");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Some Error Occured");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId);
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiResponse.json();

      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

if(loading) return <Skeleton variant="rectangular" width={650} height={650}/>

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>TODO -APP</h1>
      <div className={classes.todoListWrapper}>
        {" "}
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todo={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails 
      setOpenDialog={setOpenDialog}
      todoDetails={todoDetails} openDialog={openDialog}
      setTodoDetails={setTodoDetails} />
    </div>
  );
}

export default App;
