import "../css/menu.css";
import {useRef} from "react";

function Menu(props){
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    const handleDivClick = e => {
      document.querySelectorAll(".show-menu").forEach(el =>{
        if (el !== menuRef.current) el.classList.remove("show-menu");
        })
        document.querySelectorAll(".btn-options").forEach(el =>{
         if (el !== buttonRef.current) el.classList.remove("active")
        })
        
        menuRef.current?.classList.toggle("show-menu");
        buttonRef.current?.classList.toggle("active");
    } 

   const handleDivMouseDown = e => {
     e.stopPropagation(); //stop propagating event to document mousedown handler
   }
    
    return(
      
        <div className = {`${props.isCategory ? "category " : ""}menu`} onClick = {handleDivClick} onMouseDown = {handleDivMouseDown}>
        <button ref = {buttonRef} className = {`${props.isCategory ? "category " : ""}btn-options`}>
          <i className="fas fa-ellipsis-v"></i>
        </button>
        
        <ul ref = {menuRef} className = {`${props.isCategory ? "category " : ""}menu-list`}>
            {props.children}
        </ul>
      </div>
      
    )
}

export default Menu;