import {useModal} from "../hooks";
import Modal from "./Modal";

function Header() {
 
  const [isModalShown, setIsModalShown] = useModal();

  return (
    <header className = "header">
      <div className = "content">
      <h1 className = "app-title">Task Tracker</h1>
      {isModalShown && <Modal title = "" priority = "Medium" closeModal = {() => setIsModalShown(false)} heading = "Add task"/>}
<button className = "btn btn-add-task" onClick = {() => setIsModalShown(true)}><i className="fas fa-plus"></i> &nbsp; Add Task</button>
</div>
    </header>
  );
}

export default Header;
