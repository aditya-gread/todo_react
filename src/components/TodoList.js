import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const options = ['All Tasks','Completed Tasks', 'Active Tasks', 'Deleted Tasks'];
  const [optionSelected, setOptionSelected] = useState(0);
  const toggle = () => {
    setModal(!modal);
  };
  const [taskList, setTaskList] = useState([]);
  const [tempList,setTempList] = useState([]);

  // fetches all data from api
  const todoTasks = async (value) => {
    await axios
      .get(`http://localhost:12345/todo/${value}`)
      .then((response) => {
        if (response.data) {
            setTaskList(response.data);
            document.getElementById("head_search").value = ""
            if(value === 0){
              setOptionSelected(0);
              setTempList(response.data);
              document.getElementById("head_select").value = options[0];
            }
        }else{
          setTaskList([]);
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
      todoTasks(0);
    }

    );
  };

  // sends request to delete to api
  const todoDelete = async (taskId) => {
    axios.delete(`http://localhost:12345/todo/delete/${taskId}`, {})
    .then(() => {
      todoTasks(0)
    }
  )};
  
  // handles deleteTask
  const deleteTask = (taskObj) => {
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
      todoTasks(0)
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  // updation function
  const updateTask = (taskObj) => {
    todoUpdate(taskObj);
  };

  // adds new task
  const saveTask = (taskObj) => {
    todoAdd(taskObj);
    setModal(false);
  };

  useEffect(() => {
    if(search.length === 0 && taskList.length === 0 && optionSelected != 3){
      todoTasks(0);
    }
  }, [taskList]);

  // sends request to search data
  const searchTask = async (word) => {
    await axios
      .get(`http://localhost:12345/todo/search/${word}/${optionSelected}`)
      .then((response) => {
        if (response.data) {
            setTaskList(response.data);
        }else{
          setTaskList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handles the changes on search bar
  const handleSearch = (e) =>{
    const {name, value} = e.target;
    if( name === "search"){
      setSearch(value);
      searchTask(value);
    }
  }

  // handles the changes on select menu
  const handleSelect = (e) => {
    if(e.target.value === 'All Tasks'){
      setOptionSelected(0);
      todoTasks(0);
    }else if(e.target.value === 'Completed Tasks'){
      setOptionSelected(1);
      let tasks = tempList.filter((task) => {
        return task.Status
      } );
      setTaskList(tasks);
      document.getElementById("head_search").value = "";
    }else if (e.target.value === 'Active Tasks'){
      setOptionSelected(2);
      let tasks = tempList.filter((task) => {
        return !task.Status
      } );
      setTaskList(tasks);
      document.getElementById("head_search").value = "";
    }else {
      setOptionSelected(3);
      todoTasks(1);
    }
  }

  return (
    <>
      <div className="header">
        <h1>Todo App</h1>
        <select onChange={handleSelect} className="header-select" id="head_select">{options.map((option, index) => {
          return <option key={index}>{option}</option>
        })}</select>
        <button
          className="btn_primary"
          onClick={() => setModal(true)}
          style={{ cursor: "pointer" }}>
          Create Task
        </button>
        <input className="header-search" type="text" placeholder="Search" onChange={handleSearch} name="search" id="head_search"/>
      </div>
      <div className="task-container">
        {taskList && taskList.length>0 ?
          taskList.map((obj, index) => (
            <Card
              key={obj.Id}
              taskObj={obj}
              index={index}
              del={deleteTask}
              optionSelected ={optionSelected}
              updatedTask={updateTask}
            />
          )) :<h1>No Task Available, Please Add Some !!!!!!!</h1>}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
