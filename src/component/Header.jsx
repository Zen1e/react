import Button from "./Buttton";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { format } from "date-fns";

const Header = (props) => {
  const { todos, setTodos, history, setHistory, filter, setFilter } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
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
        {
          task: inputValue,
          createdTime: format(new Date(), "MM-dd  hh:mm:ss"),
          completedTime: "-",
          deletedTime: "-",
          id: newId,
        },
      ]);
      setInputValue("");
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
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
  return (
    <div>
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
        <Button value="Add" classname="addButton" onclick={handleAddTask} />
      </div>
      <div>
        <Button
          value="All"
          classname={filter === "all" ? "blueButton" : "a"}
          onclick={() => handleFilter("all")}
        />
        <Button
          value="Active"
          classname={filter === "act" ? "blueButton" : "a"}
          onclick={() => handleFilter("act")}
        />
        <Button
          value="Completed"
          classname={filter === "com" ? "blueButton" : "a"}
          onclick={() => handleFilter("com")}
        />
      </div>
    </div>
  );
};

export default Header;
