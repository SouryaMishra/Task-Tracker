import { useRef, useEffect} from "react";
import "../css/nav-menu.css";

function NavMenu(props) {
    
    const navMenuRef = useRef(null);

    useEffect(() => navMenuRef.current?.classList.add("visible"), [])

    const scrollTo = (e, status) => {
        closeModal();
        var element = document.querySelector(`#${status}`);
        if(element) 
            document.documentElement.scrollTo({top : element.offsetTop - 216, behavior : "smooth"});    
      }
    
      const closeModal = () => {
        navMenuRef.current?.classList.remove("visible")
        setTimeout(props.closeModal, 200);
      }

   return(<div className = "nav-menu-container" onClick = {closeModal}>
    <ul ref = {navMenuRef} className = "nav-menu" onClick = {(e) => e.stopPropagation()}>
      <li><p>Scroll to top of a category</p> <button className = "btn-close" onClick = {closeModal}>
            <i className="fas fa-times"></i>
            </button></li>
      <div className = "divider"/>
      <li><a href = "#!" onClick = {(e) => scrollTo(e, "todo")}>To do</a></li>
      <li><a href = "#!" onClick = {(e) => scrollTo(e, "in-progress")}>In Progress</a></li>
      <li><a href = "#!" onClick = {(e) => scrollTo(e, "completed")}>Completed</a></li>
    </ul>
    </div>
   )
}

export default NavMenu;