import { useState } from "react";
import "./App.css";
import Button from "./component/Buttton.jsx";
import LogHistory from "./component/LogHistory.jsx";
import Footer from "./component/Footer.jsx";
import Header from "./component/Header.jsx";
import Todos from "./component/Todos.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [overlay, setOverlay] = useState(false);
  const [history, setHistory] = useState([]);

  const handleHistory = () => {
    setOverlay(true);
  };
  return (
    <div className="container">
      <div className="main">
        <div className="sub">
          <Header
            todos={todos}
            setTodos={setTodos}
            history={history}
            setHistory={setHistory}
            filter={filter}
            setFilter={setFilter}
          />
          <div>
            {
              <Todos
                todos={todos}
                setTodos={setTodos}
                filter={filter}
                setFilter={setFilter}
                history={history}
                setHistory={setHistory}
              />
            }
          </div>
          {
            <Footer
              history={history}
              setHistory={setHistory}
              todos={todos}
              setTodos={setTodos}
            />
          }
        </div>
        <Button
          value="Log history"
          classname="logHistory"
          onclick={handleHistory}
        />
      </div>
      {overlay === true && (
        <LogHistory
          history={history}
          setHistory={setHistory}
          todos={todos}
          setTodos={setTodos}
          overlay={overlay}
          setOverlay={setOverlay}
        />
      )}
    </div>
  );
}
export default App;
