import TaskCategory from "./TaskCategory";

function Tasks(props) {
return(
        <div className = "tasks-container">
          <div className = "tasks-grid-container">
            <TaskCategory id = "todo" tasks = {props.tasks.filter(task => task.status === 0)}/>
            <TaskCategory id = "in-progress" tasks = {props.tasks.filter(task => task.status === 1)}/>
            <TaskCategory id = "completed" tasks = {props.tasks.filter(task => task.status === 2)}/>
            </div>
        </div> 
    )
}

export default Tasks;