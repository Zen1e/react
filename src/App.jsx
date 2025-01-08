import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { format} from 'date-fns';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [overlay, setOverlay] = useState(false);
  const [history, setHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEnter = (e) =>{
    if(e.key==="Enter"){
      handleAddTask();
    }
  }
  const handleAddTask = () => {
    if (inputValue.length === 0) {
      alert("Empty");
    } else {
      const newId = uuidv4();
      setTodos([
        ...todos,
        { description: inputValue, status: "act", id: newId },
      ]);
      setHistory([
        ...history,
        { task: inputValue, createdTime: format(new Date(), "MM-dd  hh:mm:ss"), completedTime: '-', deletedTime: '-', id: newId},
      ])
      setInputValue("");
    }
  };
  
  
  const handleFilter = (x) => {
    if (x === "all") {
      setFilter("all");
    }
    if (x === "act") {
      setFilter("act");
    }
    if (x === "com") {
      setFilter("com");
    }
  };
  const handleCheck = (id) => {
    const updatedTodos = todos.map((elem, i) => {
      if (elem.id === id) {
        return {
          ...elem,
          status: elem.status === "act" ? "com" : "act",
        };
      } else {
        return elem;
      }
    });
    const updatedHistory = history.map((elem) => {
      if(elem.id === id) {
        return {
          ...elem,
          completedTime: format(new Date(), "MM-dd  hh:mm:ss"),
        };
      } else {
        return elem;
      }
    });
    setTodos(updatedTodos);
    setHistory(updatedHistory);
  };
  const handleHistory = () => {
    setOverlay(true);
  }
  const activeTasks = todos.filter((elem) => elem.status==='act');
  const compleTasks = todos.filter((elem) => elem.status==='com');
  const handleDelete = (id,x) => {
    setTodos(todos.filter((elem) => elem.id !== id));
    const deletedHistory = history.map((elem) => {
      if(elem.id === id) {
        return {
          ...elem,
          deletedTime: format(new Date(), "MM-dd  hh:mm:ss"),
        };
      } else {
        return elem;
      }
  });
  setHistory(deletedHistory);
  // if(x==1){
  //   handleClear();
  // }
  }
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
  const handleClose = () => {
    setOverlay(false);
  }
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

  return (
    <div className="container">
      <div className="main">
        <div className="sub">
          <div className="todoText">To-Do List</div>
          <div className="input">
            <input
              type="text"
              placeholder="Add a new task..."
              className="textInput"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleEnter}
            />
            <input
              type="button"
              value="Add"
              className="addButton"
              onClick={handleAddTask}
            />
          </div>
          <div>
            <button
              onClick={() => {
                handleFilter("all");
              }}
              className={filter === "all" ? "blueButton" : ""}
            >
              All
            </button>
            <button
              onClick={() => {
                handleFilter("act");
              }}
              className={filter === "act" ? "blueButton" : ""}
            >
              Active
            </button>
            <button
              onClick={() => {
                handleFilter("com");
              }}
              className={filter === "com" ? "blueButton" : ""}
            >
              Completed
            </button>
          </div>
          <div>
            {todos.length === 0 ? (
              <div className="emptyMessage">No tasks available. Add some!</div>
              ) : (todos
              .filter((todo) => {
                if (filter === "all") {
                  return true;
                } else {
                  return todo.status === filter;
                }
              })
              .map((elem, index) => {
                return (
                  <div className="tasks" key={index}>
                    <input
                      type="checkbox"
                      checked={elem.status === "com"}
                      onChange={() => handleCheck(elem.id)}
                    />
                    <div className="subTask">
                      <p className={elem.status == 'com' ? 'subText decor' : 'subText'}>{elem.description}</p>
                      <button
                        className="deleteButton"
                        onClick={() => handleDelete(elem.id,0)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }))}
          </div>
          {(compleTasks.length + activeTasks.length) > 0 && (
            <div className="footer">
              <p>{compleTasks.length} of {compleTasks.length + activeTasks.length} completed</p>
            <input type="button" value="Clear completed" className="clear" onClick={handleClear}/>
            </div>
          )}

        </div>
        <div className="logHistory" onClick={handleHistory}>Log history</div>
      </div>
      {overlay === true && (
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
        </div>
      )
      }
    </div>
  );
}
export default App;
