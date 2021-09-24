import Menu from "./Menu";
import {useContext} from "react";
import {DispatchContext} from "../App";
import {statusMap} from "../appConstants";
import TaskItem from "./TaskItem";
import {useState} from "react";
import "../css/task-category.css";

function TaskCategory(props) {

    const {tasks, dispatch, asyncDispatch} = useContext(DispatchContext);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleDrop = (e) =>{
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if(e.target.getAttribute("data-drop") === "drop"){  // if dropped on a valid drop target
            moveTask(data.taskItemId.substring(3, data.taskItemId.length), e.currentTarget.id);
        }
      } 

      const moveTask = (taskId, toType) => {
        const foundTask = tasks.find(task => task.id === taskId);
        if(foundTask) {
          foundTask.status = statusMap[toType];
          asyncDispatch({type: "UPDATE_TASK_ASYNC", payload: foundTask});
        }
      }
    
      const handleDragOver = (e) =>{
       e.preventDefault(); //must prevent default handling to allow drop
       e.dataTransfer.dropEffect = 
       e.target.getAttribute("data-drop") === "drop" ? "move" : "none"; // to show move effect only on valid drop targets
       //specified by data-drop custom attribute
      } 

      const clearSelection = (type) => {
        dispatch({type: "CLEAR_SELECTION", payload: type})
      }

      const removeSelected = (type) => {
        asyncDispatch({type: "REMOVE_TASKS_ASYNC", 
        payload: props.tasks.filter(task => (task.status === statusMap[type] && task.isSelected)).map(task => task.id)});
      }

      const moveSelected = (fromType, toType) => {
        asyncDispatch({type: "UPDATE_TASKS_ASYNC", 
        payload: props.tasks.filter(task => task.status === statusMap[fromType] && task.isSelected).map(task => {
          task.status = statusMap[toType];
          return task;
        })
      })
    }

      const sortBy = (status, flag) => {
        dispatch({type: "SORT_BY", payload: {status, flag}});
      }

      const toggleCollapse = (e) => {
        setIsCollapsed(e => !e);
      }

      const selectedTasksLength = props.tasks.filter(task => task.isSelected).length

   return(
    <div id = {props.id} data-drop = "drop" className = {`task-category${isCollapsed && props.isMatching ? " collapsed" : ""}`} onDrop = {handleDrop} onDragOver = {handleDragOver}>
        <div className = "task-category-header">
          <h1>{props.id === "todo" ? "To do" : (props.id === "in-progress" ? "In Progress" : "Completed")}</h1>
          <p className = "count">{props.tasks.length}</p>
          
          {props.tasks.length === 0 || (props.isMatching && isCollapsed) || (<Menu id = {props.id} isCategory = {true}>
            <li className = "list-heading"><span>Sort by priority</span></li>
            <div className = "divider"/>
            <li><a href = "#!" onClick = {() => sortBy(props.id,"desc")}>High to Low</a></li>
            <li><a href = "#!" onClick = {() => sortBy(props.id,"asc")}>Low to High</a></li>
            {selectedTasksLength > 0 && (
            <>
            <div className = "divider"/>
            <li className = "list-heading"><span>{selectedTasksLength} {selectedTasksLength === 1 ? "task" : "tasks"} selected</span></li>
            <div className = "divider"/>
            <li><a href = "#!" onClick = {() => clearSelection(props.id)}>Clear Selection</a></li>
            <li><a href = "#!" onClick = {() => removeSelected(props.id)}>Remove Selected</a></li>
            <li><a href = "#!" onClick = {() => moveSelected(props.id, "in-progress")}>Move Selected to In Progress</a></li>
            <li><a href = "#!" onClick = {() => moveSelected(props.id, "completed")}>Move Selected to Completed</a></li>
            </>)}
   </Menu>) }
          {props.isMatching && <button className = "btn-toggle" onClick = {toggleCollapse}>
            <i className ="fas fa-chevron-down"/>
          </button>}
        </div>
        <div className = "task-category-body" data-drop = "drop">
        {props.tasks.map(task => <TaskItem key = {task.id} {...task} toggleSelection = {props.toggleSelection} moveTask = {moveTask} removeTask = {props.removeTask} handleSave = {props.handleSave}/>)}
        </div>
    </div>
   )
}

export default TaskCategory;