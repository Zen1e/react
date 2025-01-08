import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEnter = (e) =>{
    if(e.key==="Enter"){
      handleAddTask();
      console.log(e);
    }
  }
  const handleAddTask = () => {
    if (inputValue.length === 0) {
      alert("Empty");
    } else {
      setTodos([
        ...todos,
        { description: inputValue, status: "act", id: uuidv4() },
      ]);
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
    setTodos(updatedTodos);
  };
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => index !== i));
  };
  const activeTasks = todos.filter((elem) => elem.status==='act');
  const compleTasks = todos.filter((elem) => elem.status==='com');
  console.log(activeTasks,compleTasks);
  const handleClear = () => {
    setTodos(todos.filter((elem)=> elem.status !== 'com'))
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
                        onClick={() => handleDelete(index)}
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
      </div>
    </div>
  );
}
export default App;
