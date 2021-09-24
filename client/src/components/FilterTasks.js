import "../css/filter-tasks.css";
import {useMemo, useRef} from "react";

function debounce(callback, delay = 800){
    let timerId;
    return function(...args){
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(() =>  {               
            callback(...args);
            timerId = null;
        }, delay)     
    }
}

function FilterTasks(props){

    const inputRef = useRef(null); //input is uncontrolled, so use useRef hook to reset its value
    //Making input controlled does not work for debouncing, as onchange and setstate should happen synchronously
    //We have debounced the onchange handler, so now it is asynchronous 

    const debouncedSearch = useMemo( () => debounce((e) => {
        props.setFilters("title", e.target.value)
    }, 800),[])

    return(
        <div className = "filter-container">
            <form className = "filter-form" autoComplete="off">
        <div>
        <input ref = {inputRef} id = "search" className = "search-task-input" type = "search" placeholder = "Search Task" onChange = {debouncedSearch}/>
        </div>
        <div className = "inline-controls">
        <label htmlFor = "status">Status</label>
        <select id = "status" className = "select" value = {props.filters.status} onChange = {e => {
            props.setFilters("status", e.target.value);
        }}>
            <option value = "">All</option>
            <option value = "todo">To do</option>
            <option value = "in-progress">In Progress</option>
            <option value = "completed">Completed</option>
        </select>

        <label htmlFor = "priority">Priority</label>
        <select id = "priority" className = "select"  onChange = {e => {
            props.setFilters("priority", e.target.value)
        }}>
            <option value = "">All</option>
            <option value = "highest">Highest</option>
            <option value = "high">High</option>
            <option value = "medium">Medium</option>
            <option value = "low">Low</option>
            <option value = "lowest">Lowest</option>
        </select>
        <button className = "btn" onClick = {(e) => {
            e.preventDefault(); //If there is a button inside form element, it acts as submit, 
            //therefore prevent default behaviour to avoid page refresh
            inputRef.current.value = ""; //Reset value of uncontrolled element
            props.clearFilters();
        }} >Clear Filters</button>
        </div>
        </form>
        </div>
    )
}

export default FilterTasks;