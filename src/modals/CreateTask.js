import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTask = ({ modal, toggle, save }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  function Validate() {
    console.log(title.length, description.length);
    if (title.length > 0 && title.length < 256 && description.length < 256) {
      return true;
    }
    return false;
  }

  const handleStatusChange = (e) => {
    setStatus(!status);
  };

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
        style={{ color: "white", border: "1px solid white" }}
      >
        Create Task
      </ModalHeader>
      <ModalBody>
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
                    rows={4}
                    cols={23}
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
