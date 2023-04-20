import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const options = [
    "All Tasks",
    "Completed Tasks",
    "Active Tasks",
    "Deleted Tasks",
  ];
  const [optionSelected, setOptionSelected] = useState(0);
  const [err, setErr] = useState(0);
  const toggle = () => {
    setModal(!modal);
  };
  const [taskList, setTaskList] = useState([]);
  const limit = 8;
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  let reff = useRef(null);
  const api = "http://localhost:12345/todo/";

  // fetches all data from api
  const todoTasks = async (value) => {
    setErr(0);
    if (hasMore)
      await axios
        .get(`${api}?id=${value}&offset=${offset}`)
        .then((response) => {
          if (response.data) {
            if (response.data < limit) {
              setHasMore(false);
            }
            setTaskList((taskList) => [...taskList, ...response.data]);
            document.getElementById("head_search").value = "";
            if (value === 0) {
              setOptionSelected(0);
              document.getElementById("head_select").value = options[0];
            }
          } else {
            setHasMore(false);
            if (offset === 0) {
              setTaskList([]);
            }
          }
        })
        .catch((error) => {
          setErr(1);
          console.log(error);
          setTaskList([]);
        });
  };

  // sends data to api
  const todoAdd = async (taskObj) => {
    setErr(0);
    axios
      .post(api, {
        Title: taskObj["Title"],
        Description: taskObj["Description"],
        Status: taskObj["Status"],
      })
      .then(() => {
        reset();
        todoTasks(optionSelected);
      })
      .catch((error) => {
        setErr(1);
        console.log(error);
        setTaskList([]);
      });
  };

  // sends request to delete to api
  const todoDelete = async (taskId, deleteType) => {
    setErr(0);
    axios
      .delete(`${api}?id=${taskId}&type=${deleteType}`, {})
      .then(() => {
        reset();
        todoTasks(optionSelected);
      })
      .catch((error) => {
        setErr(1);
        console.log(error);
        setTaskList([]);
      });
  };

  // handles deleteTask
  const deleteTask = (taskObj, deleteType) => {
    todoDelete(taskObj["Id"], deleteType);
  };

  // sends request to update to api
  const todoUpdate = async (taskObj) => {
    setErr(0);
    axios
      .put(`${api}?id=${taskObj["Id"]}`, {
        Id: taskObj["Id"],
        Title: taskObj["Title"],
        Description: taskObj["Description"],
        Status: taskObj["Status"],
      })
      .then(() => {
        reset();
        todoTasks(optionSelected);
      })
      .catch((error) => {
        setErr(1);
        console.log(error);
        setTaskList([]);
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
    // if(offset > 0)
    if (search === "") todoTasks(optionSelected);
    const container = reff.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [offset]);

  // sends request to search data
  const searchTask = async (word) => {
    setErr(0);
    if (hasMore)
      await axios
        .get(
          `${api}search/?word=${word}&id=${optionSelected}&offset=${offset}`
        )
        .then((response) => {
          if (response.data) {
            setTaskList((tasks) => [...tasks, ...response.data]);
            if (response.data < limit) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
            if (offset === 0) {
              setTaskList([]);
            }
          }
        })
        .catch((error) => {
          setErr(1);
          console.log(error);
          setTaskList([]);
        });
  };

  // handles the changes on search bar
  const handleSearch = (e) => {
    reset();
    const { name, value } = e.target;
    console.log("search",value);
    if (name === "search") {
      setSearch(value);
      if (value !== "") searchTask(value);
      else {
        reset();
        todoTasks(optionSelected);
      }
    }
  };

  // handles the changes on select menu
  const handleSelect = (e) => {
    if (e.target.value === "All Tasks") {
      setTaskList([]);
      reset();
      todoTasks(0);
    } else if (e.target.value === "Completed Tasks") {
      setOptionSelected(1);
      reset();
      todoTasks(1);
      document.getElementById("head_search").value = "";
    } else if (e.target.value === "Active Tasks") {
      setOptionSelected(2);
      reset();
      todoTasks(2);
      document.getElementById("head_search").value = "";
    } else {
      setOptionSelected(3);
      reset();
      todoTasks(3);
    }
  };

  const handleScroll = (e) => {
    const element = reff.current;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      if (hasMore) {
        setOffset((prev) => prev + limit);
      }
    }
  };

  function reset() {
    setTaskList([]);
    setOffset(0);
    setHasMore(true);
  }

  return (
    <>
      <div className="header">
        <h1>Todo App</h1>
        <select
          onChange={handleSelect}
          className="header-select"
          id="head_select"
        >
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <button
          className="btn_primary"
          onClick={() => setModal(true)}
          style={{ cursor: "pointer" }}
        >
          Create Task
        </button>
        <input
          className="header-search"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          name="search"
          id="head_search"
        />
      </div>
      <div className="task-container" ref={reff}>
        {taskList && taskList.length > 0 ? (
          taskList.map((obj, index) => (
            <Card
              // key={obj.Id}
              taskObj={obj}
              index={index}
              del={deleteTask}
              optionSelected={optionSelected}
              updatedTask={updateTask}
            />
          ))
        ) : (
          <h1>
            {err
              ? "Something Went Wrong !!!!"
              : "No Task Available, Please Add Some !!!!!!!"}
          </h1>
        )}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
