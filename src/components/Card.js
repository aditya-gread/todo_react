import React, { useState } from 'react'
import EditTask from '../modals/EditTask';


const Card = ({taskObj, index, del, updatedTask })=> {

    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]


    const toggle = () =>{
        setModal(!modal);
    }
    

    const updateTask = () =>{
        updatedTask(taskObj,index);
    }

    const handleDelete = () => {
        // taskList.splice(index,1)
        del(taskObj,index);
    }
  return (
    <>
    <div className='card-wrapper'>
        <div className = "card-top" style={{"backgroundColor": colors[index%5].primaryColor, "width": "100%", "height": "3%"}}></div>
            <div className = "task-holder">
                <span className = "card-header" style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px"}}>{taskObj.Title}</span>
                <p className="card-desc" >{taskObj.Description}</p>
                <div className="card-actions">
                    <div>
                        <h4>{taskObj.Status ? "-> DONE":"-> PENDING"}</h4>
                    </div>
                    <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                        <input type='button' className = "card_edit" style={{"backgroundColor" : colors[index%5].primaryColor, "cursor" : "pointer", "marginRight": "5px"}} onClick = {() => setModal(true)} value="Edit"/>
                        <input type='button' className="card_delete" style = {{"backgroundColor" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete} value="Delete"/>
                    </div>
                </div>
        </div>
    </div>
    <EditTask toggle={toggle} modal={modal} updte={updateTask} taskObj ={taskObj}/>
    </>
  )
}

export default Card