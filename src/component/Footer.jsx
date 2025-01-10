import Button from "./Buttton";
import { format } from "date-fns";

const Footer = (props) => {
    const {history, setHistory, todos, setTodos} = props;

      const handleClear = () => {
       
        const deletedTodosId = todos.filter((el)=>el.status =="com").map((el)=>el.id);
        const newHistory = history.map((el)=>{
          if(deletedTodosId.includes(el.id)){
            return{
              ...el, deletedTime: format(new Date(), "MM-dd  hh:mm:ss"),
            }
          } else return el
        })
    
        setHistory(newHistory)
    
        const newTodos = todos.filter((el)=>el.status !=="com");
        setTodos(newTodos)
      }

    const activeTasks = todos.filter((elem) => elem.status==='act');
    const compleTasks = todos.filter((elem) => elem.status==='com');
    return(
        compleTasks.length + activeTasks.length) > 0 && (
            <div className="footer">
              <p>{compleTasks.length} of {compleTasks.length + activeTasks.length} completed</p>
            <Button value = "Clear completed" classname='clear' onclick={handleClear}/>
        </div>
    )
}

export default Footer;