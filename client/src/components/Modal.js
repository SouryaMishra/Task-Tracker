import {useEffect, useState, useContext, useRef} from "react";
import {DispatchContext} from "../App";
import {v4 as uuidv4} from "uuid";
import "../css/modal.css";

function Modal(props){
    const [error, setError] = useState("")

    const {tasks, asyncDispatch} = useContext(DispatchContext);
    const windowRef = useRef(null);
    const titleRef = useRef("");
    const priorityRef = useRef("");

    useEffect(() => {
        windowRef.current?.classList.add("visible");
        titleRef.current.value = props.title;
        priorityRef.current.value = props.priority;
    },[props.title, props.priority])

    const handleSave = () => {
            const title = titleRef.current.value;
            const priority = priorityRef.current.value; 
            
            if(title.trim() === ""){
                setError("Please enter a task description");
                return;
            }
           closeModal();
           if(!props.taskId)
                asyncDispatch({type: "ADD_TASK_ASYNC", payload: {id: uuidv4(), title, status: 0, priority, isSelected: false}});
           else{
                const foundTask = tasks.find(task => task.id === props.taskId);
                if(foundTask)
                    asyncDispatch({type: "UPDATE_TASK_ASYNC", payload: {id: props.taskId, title, priority, status: foundTask.status, isSelected: foundTask.isSelected}});
           }
    }

    const closeModal = () => {
        windowRef.current?.classList.remove("visible");
        setTimeout(props.closeModal, 250);
    }

    return (
        <div className = "modal" onClick = {closeModal}>
            <div ref = {windowRef} className = "modal-window" onClick = {e => e.stopPropagation()}>
            <div className = "modal-header">
                <h1>{props.heading}</h1>
                <button className = "btn-close" onClick = {closeModal}>
                <i className="fas fa-times"></i>
                </button>
            </div>
            <div className = "divider"/>
            <div className = "modal-content">
                {error && <p className = "error-text">{error}</p>}
                <form className = "form-edit" autoComplete = "off">
                    <div className = "form-control">
                    <label htmlFor = "title">Description</label>
                    <textarea ref = {titleRef} id = "title" rows = {4} maxLength = {250} onChange = {e => {
                        if(e.target.value.trim() === "") setError("Please enter a task description");
                        else setError("")
                    }}/>
                    </div>
                    <div className = "form-control">
                    <label htmlFor = "priority">Priority</label>
                    <select ref = {priorityRef} id = "priority" className = "select-priority">
                        <option value = "Highest">Highest</option>
                        <option value = "High">High</option>
                        <option value = "Medium">Medium</option>
                        <option value = "Low">Low</option>
                        <option value = "Lowest">Lowest</option>
                    </select>
                   </div>
                </form>
            </div>
            <div className = "modal-footer">
                <div className = "form-actions">
                        <button className = "btn" onClick = {handleSave}>Save Changes</button>
                        <button className = "btn btn-cancel" onClick = {closeModal} >Cancel</button>
                </div>   
            </div>
            </div>
        </div>
    )
}

export default Modal;