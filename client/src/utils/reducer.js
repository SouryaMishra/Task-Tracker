import {statusMap, priorityMap} from "../appConstants";
const reducer = (tasks, action) => {
    switch(action.type){
        case "FETCH_ALL_TASKS":
        return action.payload.map(task => ({...task, isSelected : false}));
        case "ADD_TASK":
        return [...tasks, {...action.payload}];
        case "UPDATE_TASK":
        return tasks.map(task => task.id === action.payload.id ? action.payload : task);
        case "UPDATE_TASKS":
        const ids = action.payload.map(task => task.id);
        return tasks.map(task => {
            if(ids.includes(task.id))   
                return action.payload.find(updatedTask => updatedTask.id === task.id);
            return task;
        });
        case "REMOVE_TASK":
        return tasks.filter(task => task.id !== action.payload);
        case "REMOVE_TASKS":
        return tasks.filter(task => !action.payload.includes(task.id));
        case "TOGGLE_SELECTION":
        return tasks.map(task => task.id === action.payload ? {...task, isSelected: !task.isSelected} : {...task});
        case "CLEAR_SELECTION":
        return tasks.map(task => task.status === statusMap[action.payload] && task.isSelected ? {...task, isSelected: !task.isSelected} : {...task});
        case "SORT_BY":
        const {flag, status} = action.payload;
        const filteredTasks = tasks.filter(task => task.status === statusMap[status]);
        if(filteredTasks.length > 0) {
            filteredTasks.sort((task1,task2) => flag === "asc" ? priorityMap[task1.priority] - priorityMap[task2.priority] : priorityMap[task2.priority] - priorityMap[task1.priority]);
            return tasks.filter(task => task.status !== statusMap[status]).concat(filteredTasks);
        }
        return tasks;      
        default:
        return tasks;  
    }
}

export default reducer;