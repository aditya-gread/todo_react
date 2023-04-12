import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [taskList, setTaskList] = useState([]);

  const todoTasks = async () => {
    await axios
      .get("http://localhost:12345/todo/")
      .then((response) => {
        if (response.data) {
          if (setTaskList.length >= 0) {
            setTaskList(response.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const todoAdd = async (taskObj) => {
    axios.post("http://localhost:12345/todo/", {
      Title: taskObj["Title"],
      Description: taskObj["Description"],
      Status: taskObj["Status"],
    });
  };

  const todoDelete = async (taskId) => {
    axios.post(`http://localhost:12345/todo/delete/${taskId}`, {});
  };

  const deleteTask = (taskObj, index) => {
    todoDelete(taskObj["Id"]);
    let tempList = taskList;
    tempList.splice(index, 1);
    setTaskList(tempList);
    window.location.reload();
  };

  const todoUpdate = async (taskObj) => {
    axios.put(`http://localhost:12345/todo/update/${taskObj["Id"]}`, {
      Id: taskObj["Id"],
      Title: taskObj["Title"],
      Description: taskObj["Description"],
      Status: taskObj["Status"],
    });
  };

  const updateTask = (taskObj, index) => {
    todoUpdate(taskObj);
    let tempList = taskList;
    tempList[index] = taskObj;
    setTaskList(tempList);
    window.location.reload();
  };

  const saveTask = (taskObj) => {
    console.log(taskList, "taskList");
    let tempList = [...taskList];
    tempList.push(taskObj);
    todoAdd(taskObj);
    setTaskList(tempList);
    setModal(false);
  };

  useEffect(() => {
    todoTasks();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Todo App</h1>
        <button
          className="btn_primary"
          onClick={() => setModal(true)}
          style={{ cursor: "pointer" }}
        >
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList ?
          taskList.map((obj, index) => (
            <Card
              key={obj.Id}
              taskObj={obj}
              index={index}
              del={deleteTask}
              updatedTask={updateTask}
            />
          )) : <p>No Task Left Add Some Please!!!!!!!</p>}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
