import {useContext, useRef} from "react";
import Menu from "./Menu";
import Modal from "./Modal";
import "../css/task-item.css";
import {colorMap} from "../appConstants";
import { DispatchContext } from "../App";
import {useModal} from "../hooks";

function TaskItem(props){
  const [isModalShown, setIsModalShown] = useModal();
  const {id, title, priority, status, isSelected} = props;
  const {dispatch, asyncDispatch} = useContext(DispatchContext);
  const taskItemRef = useRef(null);

  const handleDragStart = (e) =>{
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({taskItemId : e.target.id, innerHTML : e.target.innerHTML}));
    e.target.classList.add("dragging");
  } 

  const handleDragEnd = e => {
    e.target.classList.remove("dragging");
  }

  const showModal = () => {
    setIsModalShown(true)
  }

  const removeTask = taskId => {
    asyncDispatch({type: "REMOVE_TASK_ASYNC", payload: taskId })
  }

  const toggleSelection = id => {
    dispatch({type: "TOGGLE_SELECTION", payload: id});
  }

  return(
    <>
    {isModalShown && <Modal taskId = {id} title = {title} priority = {priority} closeModal = {() => setIsModalShown(false)} heading = "Edit task"/>}
    <div ref = {taskItemRef} id = {`id-${id}`} data-type = "task-item" className = "task-item" draggable = {"true"} onDragStart = {handleDragStart} onDragEnd = {handleDragEnd}>
      <div className = "task-item-header">
        <input id = {`checkbox-${id}`} className = "task-item-checkbox" type = "checkbox" checked = {isSelected} onChange = {e => toggleSelection(id)}/>
        <label htmlFor = {`checkbox-${id}`}/>
        <div className = "task-actions">
          <Menu id = {id} isCategory = {false}>
            <li><a href = "#!" onClick = {showModal}>Edit</a></li>
            <li><a href = "#!" onClick = {() => removeTask(id)}>Remove</a></li>
           { status === 0 ? (
              <>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "in-progress")}>Move to In Progress</a></li>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "completed")}>Move to Completed</a></li>
              </>
            ) :  ( status === 1 ? (
              <>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "todo")}>Move to To do</a></li>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "completed")}>Move to Completed</a></li>
              </>
            ) : 
            (
              <>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "in-progress")}>Move to In Progress</a></li>
                <li><a href = "#!" onClick = {() => props.moveTask(id, "todo")}>Move to To do</a></li>
              </>
            ))}
          </Menu>     
        </div>
      </div>
      <div className = "task-item-body">
      <h1 className = "task-title">{title.length > 120 ? title.substring(0,120) + "..." : title}</h1>
      </div>
      
      <div className = "task-item-footer">
        <div className = "priority-container" >
          <div className = "indicator" style = {{background: colorMap[priority]}}/>
          <p>{priority}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default TaskItem;
