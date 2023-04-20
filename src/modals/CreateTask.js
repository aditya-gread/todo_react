import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTask = ({ modal, toggle, save }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  // handles changes made in title and description
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  //validates the inputs
  function Validate() {
    if (title.length > 0 && title.length < 256 && description.length < 256) {
      return true;
    }
    return false;
  }

  // handles changes made in status checkbox
  const handleStatusChange = (e) => {
    setStatus(!status);
  };

  // handles create button
  const handleSave = () => {
    if (!Validate()) {
      toggle();
      alert(
        "Either Title is empty or title or description exceeds 256 character length"
      );
      setTitle("");
      setDescription("");
      setStatus(false);
      return;
    }
    let taskObj = {};
    // taskObj["Id"] = Math.floor(Math.random()*10000000)+1;
    taskObj["Title"] = title;
    taskObj["Description"] = description;
    taskObj["Status"] = status;
    save(taskObj);
    setTitle("");
    setDescription("");
    setStatus(false);
  };

  return (
    <Modal isOpen={modal} toggle={toggle} className="form_modal">
      <ModalHeader
        toggle={toggle}
        style={{ color: "white", border: "1px solid white", backgroundColor:"black" }}
      >
        Create Task
      </ModalHeader>
      <ModalBody style={{backgroundColor: "black"}}>
        <form>
          <table style={{ color: "white" }}>
            <tbody>
              <tr>
                <td>
                  <b>Title : </b>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter The task title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Description : </b>
                </td>
                <td>
                  <textarea
                    style={{ backgroundColor: "white" }}
                    name="description"
                    rows={15}
                    cols={60}
                    placeholder="Enter the task description here"
                    defaultValue={""}
                    onChange={handleChange}
                    value={description}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <input
                    type="checkbox"
                    value={status}
                    onChange={handleStatusChange}
                    name="status"
                  />
                </td>
                <td>Is the task complete</td>
              </tr>
            </tbody>
          </table>
        </form>
      </ModalBody>
      <ModalFooter className="form_footer">
        <Button style={{ color: "green" }} onClick={handleSave}>
          Create
        </Button>{" "}
        <Button style={{ color: "red" }} onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTask;
