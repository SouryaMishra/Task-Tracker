import {useState, createContext, useMemo} from "react";
import Header from "./components/Header";
import TaskCategory from "./components/TaskCategory";
import FilterTasks from "./components/FilterTasks";
import NavMenu from "./components/NavMenu";
import {useFetch, useModal, useMedia} from "./hooks"; 
import {statusMap} from "./appConstants";
import './App.css';

export const DispatchContext = createContext(null);

function App() {

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    priority:""
  });

  
  const {tasks, isLoading, value} = useFetch();
  const isMatching = useMedia();
  const [isModalShown, setIsModalShown] = useModal();
  
  const clearFilters = () => {
    setFilters({
      title : "", status : "", priority : ""
    })
  }

  const userFilteredTasks = useMemo(() => {
    const appliedFilters = Object.keys(filters).filter(key => filters[key] !== "");
    if(appliedFilters.length === 0) return tasks;
    return tasks.filter(task => {
      let flag1 = true, flag2 = true, flag3 = true;
      if(appliedFilters.includes("title"))
      flag1 = task.title.toLowerCase().includes(filters.title.trim().toLowerCase()) 
      if(appliedFilters.includes("status"))
      flag2 = task.status === statusMap[filters.status]
      if(appliedFilters.includes("priority"))
      flag3 = task.priority.toLowerCase() === filters.priority.toLowerCase();
      return flag1 && flag2 && flag3;
    });
  }, [filters, tasks]);

  return (
    <div className="App">
        
        <DispatchContext.Provider value = {value}>
          <Header/>
          <FilterTasks filters = {filters} clearFilters = {clearFilters} 
          setFilters = {(key, value) => {
            console.log("parent callback called", key, value);
            setFilters({...filters, [key] : value})
          }}
          />
          {isMatching && <button className = "navbar" onClick = {() => setIsModalShown(true)}>
              <i className ="fas fa-chevron-up"/>
              <i className ="fas fa-chevron-down"/>
          </button>}
          {isLoading ? <div className = "loading"><i className="fas fa-circle-notch"></i></div> : 
          
          <div className = "tasks-container">
          <div className = "tasks-grid-container">            
            <TaskCategory id = "todo" tasks = {userFilteredTasks.filter(task => task.status === 0)} isMatching = {isMatching}/>
            <TaskCategory id = "in-progress" tasks = {userFilteredTasks.filter(task => task.status === 1)} isMatching = {isMatching}/>
            <TaskCategory id = "completed" tasks = {userFilteredTasks.filter(task => task.status === 2)} isMatching = {isMatching}/>
          
            </div>
  </div> }
          
        </DispatchContext.Provider>
        {isModalShown && <NavMenu closeModal = {() => setIsModalShown(false)}/>}
    </div>
  );
}

export default App;