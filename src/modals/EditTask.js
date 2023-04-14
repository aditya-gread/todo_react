import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTask = ({ modal, toggle, updte, taskObj }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  //resets inputs on cancel
  function reset() {
    toggle();
    setEditTitle(taskObj.Title);
    setEditDescription(taskObj.Description);
    setEditStatus(taskObj.Status);
  }

  // handle update button
  const handleUpdate = (e) => {
    if (!Validate()) {
      reset();
      alert(
        "Either Title is empty or title or description exceeds 256 character length"
      );
      return;
    }
    e.preventDefault();
    taskObj["Title"] = editTitle;
    taskObj["Description"] = editDescription;
    taskObj["Status"] = editStatus;
    updte(taskObj);
  };

  // validates the input 
  function Validate() {
    if (
      editTitle.length > 0 &&
      editTitle.length < 256 &&
      editDescription.length < 256
    ) {
      return true;
    }
    return false;
  }

  // handle changes made in title and description
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setEditTitle(value);
    } else if (name === "description") {
      setEditDescription(value);
    }
  };

  // handle changes made in status checkbox
  const handleStatusChange = (e) => {
    setEditStatus(!editStatus);
    console.log(taskObj);
  };

  useEffect(() => {
    setEditTitle(taskObj.Title);
    setEditDescription(taskObj.Description);
    setEditStatus(taskObj.Status);
  }, []);

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
                    value={editTitle}
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
                    value={editDescription}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <input
                    type="checkbox"
                    defaultChecked={editStatus}
                    value={editStatus}
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
        <Button style={{ color: "green" }} onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button style={{ color: "red" }} onClick={reset}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTask;
