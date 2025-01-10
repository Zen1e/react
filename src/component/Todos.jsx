import { format } from "date-fns";

const Todos = (props) => {

    const {todos, setTodos, filter, setFilter, history, setHistory} = props;

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
      }

    return(
        todos.length === 0 ? (
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
            }))
    )
}

export default Todos;