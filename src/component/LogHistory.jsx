
const LogHistory = (props) => {
    const {history, setHistory, todos, setTodos, overlay, setOverlay} = props;
    const activeTasks = todos.filter((elem) => elem.status==='act');
    const compleTasks = todos.filter((elem) => elem.status==='com');
    const handleRestore = (elem) => {
        const restored = history.map((el) =>{
        if(elem.deletedTime!=='-'&& el.id===elem.id){
          setTodos([
            ...todos,
            { description: elem.task, status: "act", id: elem.id },
          ]);
          return {
            ...el,
            deletedTime: '-',
          }
        } else {
            return el;
        }
      })
      setHistory(restored);
    }    
    const handleHistory = () => {
      setOverlay(true);
    }
    const handleClose = () => {
        setOverlay(false);
      }
return(
    <div className="logWindow">
        <div className="logTitle"><p>Log history</p></div>
        <div className="logRow">
        <p>№</p>
        <p>Task</p>
        <p>Created date</p>
        <p>Completed date</p>
        <p>Deleted date</p>
        </div>
        {history.map((elem, index) => (
        <div className="logRow" key={index} onClick={() => handleRestore(elem)}>
            <p>{index+1}.)</p>
            <p>{elem.task}</p>
            <p>{elem.createdTime}</p>
            <p>{elem.completedTime}</p>
            <p>{elem.deletedTime}</p>
        </div>
        ))}
        <div className="closeC">
        <input type="button" value="Close" onClick={handleClose}/>
        </div>
    </div>)
}

export default LogHistory;