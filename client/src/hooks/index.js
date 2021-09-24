import {useState, useEffect, useReducer, useCallback, useMemo, useRef} from "react";
import reducer from "../utils/reducer";
import {fetchAllTasks, addTask, updateTask, updateTasks, removeTask, removeTasks} from "../api";

export function useFetch() {
    const [tasks, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(false);

    const isMounted = useRef(false);

      const asyncDispatch = useCallback((action) => {
        switch(action.type) {
          case "FETCH_ALL_TASKS_ASYNC":
          fetchAllTasks()
          .then(tasks => {
            if(isMounted.current) {
            setIsLoading(false);
            dispatch({type : "FETCH_ALL_TASKS", payload: tasks});
            }
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
          });
          break;
    
          case "ADD_TASK_ASYNC":
          addTask(action.payload).then( addedTask => {
            if(isMounted.current) dispatch({type : "ADD_TASK", payload: addedTask})  
          })
          .catch(err => console.log(err));
          break;
    
          case "UPDATE_TASK_ASYNC":
            updateTask(action.payload).then( updatedTask => {
              if(isMounted.current) dispatch({type : "UPDATE_TASK", payload: updatedTask})  
          })
          .catch(err => console.log(err));
          break;
    
          case "UPDATE_TASKS_ASYNC":
            updateTasks(action.payload).then( updatedTasks => {
              if(isMounted.current) dispatch({type : "UPDATE_TASKS", payload: updatedTasks})  
            })
            .catch(err => console.log(err));
          break;
    
          case "REMOVE_TASK_ASYNC":
            removeTask(action.payload).then( () => {
              if(isMounted.current) dispatch({type : "REMOVE_TASK", payload: action.payload})  
            })
            .catch(err => console.log(err));
          break;
    
          case "REMOVE_TASKS_ASYNC":
            removeTasks(action.payload).then( () => {
              if(isMounted.current) dispatch({type : "REMOVE_TASKS", payload: action.payload})  
            })
            .catch(err => console.log(err));
          break;
    
          default: 
          return;
        }
      },[])
    
      const value = useMemo(() => {
        return {
          tasks,
          dispatch,
          asyncDispatch  //memoized with useCallback
        }
      }, [tasks, dispatch, asyncDispatch])

      useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
      }, []);

      useEffect(() => {
        console.log("Loading...")
        setIsLoading(true);
        asyncDispatch({type: "FETCH_ALL_TASKS_ASYNC"});
      }, [asyncDispatch]);
    

    return {tasks, dispatch, isLoading, value}; //return object instead of an array, because order matters in array destructuring

}


export function useModal() {
    const [isModalShown, setIsModalShown] = useState(false);
      
    useEffect(() => {
      if(isModalShown) document.body.classList.add("modal-shown")
      else {
        document.body.classList.remove("modal-shown");
        document.querySelector(".nav-menu")?.classList.remove("visible");
      }
    },[isModalShown])
    
    return [isModalShown, setIsModalShown];
}

export function useMedia(queryString = "(max-width : 768px)") {
  const [isMatching, setIsMatching] = useState(false);
      
  useEffect(() => {
    let mediaQuery = window.matchMedia(queryString);
    setIsMatching(mediaQuery.matches); // to match initially when screen width is less than 768px and not changing
    const handleScreenWidthChange = e => {
      setIsMatching(e.matches);
    }
    mediaQuery.addEventListener('change', handleScreenWidthChange); // when screen width is changing
  },[setIsMatching, queryString])
  
  return isMatching;

}