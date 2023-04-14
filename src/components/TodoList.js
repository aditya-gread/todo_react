import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const toggle = () => {
    setModal(!modal);
  };
  const [taskList, setTaskList] = useState([]);

  // fetches all data from api
  const todoTasks = async () => {
    await axios
      .get("http://localhost:12345/todo/")
      .then((response) => {
        if (response.data) {
            setTaskList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sends data to api
  const todoAdd = async (taskObj) => {
    axios.post("http://localhost:12345/todo/", {
      Title: taskObj["Title"],
      Description: taskObj["Description"],
      Status: taskObj["Status"],
    }).then(() =>{
      todoTasks();
    }

    );
  };

  // sends request to delete to api
  const todoDelete = async (taskId) => {
    axios.delete(`http://localhost:12345/todo/delete/${taskId}`, {})
    .then(() => {
      todoTasks()
    }
    )};

  const deleteTask = (taskObj, index) => {
    todoDelete(taskObj["Id"]);
  };

  // sends request to update to api
  const todoUpdate = async (taskObj) => {
    axios.put(`http://localhost:12345/todo/update/${taskObj["Id"]}`, {
      Id: taskObj["Id"],
      Title: taskObj["Title"],
      Description: taskObj["Description"],
      Status: taskObj["Status"],
    }).then(() => {
      todoTasks()
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  const updateTask = (taskObj) => {
    todoUpdate(taskObj);
  };

  const saveTask = (taskObj) => {
    console.log(taskList, "taskList");
    todoAdd(taskObj);
    setModal(false);
  };

  useEffect(() => {
    if(search.length === 0 && taskList.length === 0){
      todoTasks();
    }
  }, [taskList,search]);

  // sends request to search data
  const searchTask = async (word) => {
    await axios
      .get(`http://localhost:12345/todo/search/${word}`)
      .then((response) => {
        if (response.data) {
          if (setTaskList.length >= 0) {
            setTaskList(response.data);
          }
        }else{
          setTaskList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) =>{
    const {name, value} = e.target;
    if( name === "search"){
      setSearch(value);
      searchTask(value);
    }
  }

  return (
    <>
      <div className="header">
        <h1>Todo App</h1>
        <button
          className="btn_primary"
          onClick={() => setModal(true)}
          style={{ cursor: "pointer" }}>
          Create Task
        </button>
        <input className="header-search" type="text" placeholder="Search" onChange={handleSearch} name="search"/>
      </div>
      <div className="task-container">
        {taskList && taskList.length>0 ?
          taskList.map((obj, index) => (
            <Card
              key={obj.Id}
              taskObj={obj}
              index={index}
              del={deleteTask}
              updatedTask={updateTask}
            />
          )) :<h1>No Task Available, Please Add Some !!!!!!!</h1>}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
