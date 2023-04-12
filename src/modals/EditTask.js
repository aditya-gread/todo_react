import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const EditTask = ({modal,toggle, updte, taskObj}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);


    function reset(){
      toggle();
        setTitle(taskObj.Title)
        setDescription(taskObj.Description)
        setStatus(taskObj.Status)
    }

    const handleUpdate = (e) => {
        if(!Validate()){
            toggle()
            alert("Either Title is empty or title or description exceeds 256 character length");
            return;
          }
        e.preventDefault();
        taskObj["Title"] = title ;
        taskObj["Description"] = description;
        taskObj["Status"] = status;
        updte(taskObj);
        setTitle("");
        setDescription("");
        setStatus(false);
      }
    function Validate(){
        if(title.length>0 && title.length<256 && description.length<256){
          return true;
        }
        return false;
      }

    const handleChange = (e) =>{
        const {name, value} = e.target;

        if (name === "title"){
          setTitle(value);
        }else if (name === "description"){
          setDescription(value)
        }
        console.log(taskObj);
    }
    
    const handleStatusChange = (e) =>{
          setStatus(!status);
          console.log(taskObj);
    }

    useEffect(() => {
        setTitle(taskObj.Title)
        setDescription(taskObj.Description)
        setStatus(taskObj.Status)
    },[])

  return (
    <Modal isOpen={modal} toggle={toggle} className='form_modal'>
        <ModalHeader toggle={toggle} style={{"color" : "white" , "border" : "1px solid white"}} >Create Task</ModalHeader>
        <ModalBody>
          <form>
          <table style={{ color: "white"}}>
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
                  <input type="checkbox" defaultChecked={status} value={status} onChange={handleStatusChange} name='status'/>
                </td>
                <td>Is the task complete</td>
              </tr>
            </tbody>
          </table>
          </form>
        </ModalBody>
        <ModalFooter className='form_footer'>
          <Button style={{"color" : "green"}} onClick={handleUpdate}>Update</Button>{' '}
          <Button style={{"color" : "red"}} onClick={reset}>Cancel</Button>
        </ModalFooter>
      </Modal>
  )
}

export default EditTask