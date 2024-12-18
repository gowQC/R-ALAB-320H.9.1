import { useState, useReducer } from "react";
import { Link } from "react-router";

export default function ModifyList() {
  // initial todo list items
  const initialState = [
    {
      task: "Walk the dog",
      completed: false,
    },
    {
      task: "Go grocery shopping",
      completed: false,
    },
    {
      task: "Complete workouts",
      completed: false,
    },
  ];

  // reducer function
  const reducer = (todoList, action) => {
    switch (action.type) {
      case "update": {
        if (!action.payload.oldTask) {
          // executes with handleUpdateCompletion
          return todoList.map((task) => {
            if (task.task === action.payload.task) {
              return { ...task, completed: action.payload.completed };
            }
            return task;
          });
        } else {
          // executes with handleUpdateCompletion
          return todoList.map((task) => {
            if (task.task === action.payload.oldTask) {
              return { task: action.payload.task, completion: false };
            } else return task;
          });
        }
      }
      case "add": {
        const newTask = {
          task: action.payload.task,
          completed: action.payload.completed,
        };
        return [newTask, ...todoList];
      }
      case "delete": {
        return todoList.filter((task) => task.task !== action.payload.task);
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  // useReducer variable and dispatch
  const [todoList, dispatch] = useReducer(reducer, initialState);

  // will register values of form data
  // first form
  const [modifiedText, setModifiedText] = useState(initialState[0].task || "");
  const [modifiedCompleted, setModifiedCompleted] = useState(false);
  // second form
  const [taskDescription, setTaskDescription] = useState(
    initialState[0].task || ""
  );
  const [newTaskDescription, setNewTaskDescription] = useState("");
  // third form
  const [newText, setNewText] = useState("");
  const [newCompleted, setNewCompleted] = useState(false);

  // form submit and button click functions
  // first form
  function handleUpdateCompletion(event) {
    event.preventDefault();
    dispatch({
      type: "update",
      payload: { task: modifiedText, completed: modifiedCompleted },
    });
    setModifiedText(initialState[0].task || "");
    setModifiedCompleted(false);
  }

  // second form
  function handleUpdateDescription(event) {
    event.preventDefault();
    dispatch({
      type: "update",
      payload: { task: newTaskDescription, oldTask: taskDescription },
    });
    setTaskDescription(initialState[0].task || "");
    setNewTaskDescription("");
  }

  // third form
  function handleAdd(event) {
    event.preventDefault();
    dispatch({
      type: "add",
      payload: { task: newText, completed: newCompleted },
    });
    setNewText("");
    setNewCompleted(false);
  }

  // button click
  function handleDelete(incomingTask, incomingCompleted) {
    dispatch({
      type: "delete",
      payload: { task: incomingTask, completed: incomingCompleted },
    });
  }

  return (
    <div>
      <h2>Current Todo List</h2>
      {todoList && todoList.length > 0 ? (
        <ol>
          {todoList.map((item, index) => {
            if (item.completed === true) {
              return (
                <li key={index}>
                  {item.task}: <span style={{ color: "green" }}>&#9745;</span>{" "}
                  <button
                    onClick={() => handleDelete(item.task, item.completed)}
                  >
                    DELETE
                  </button>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  {item.task}: <span style={{ color: "red" }}>X</span>{" "}
                  <button disabled>DELETE</button>
                </li>
              );
            }
          })}
        </ol>
      ) : (
        <p>There don't seem to be any tasks here... Let's change that!</p>
      )}
      <Link to="/">Click here to go back home</Link>
      <br />
      <hr />
      <h2>Modify Todo List</h2>
      {/**First form */}
      {todoList && todoList.length > 0 ? (
        <form onSubmit={handleUpdateCompletion}>
          <h3>Change Task Completion</h3>
          <label htmlFor="oldTask">Select task to modify</label>{" "}
          <select
            name="oldTask"
            id="oldTask"
            value={modifiedText}
            onChange={(event) => setModifiedText(event.target.value)}
          >
            {todoList.map((item, index) => {
              return (
                <option key={index} value={item.task}>
                  {item.task}
                </option>
              );
            })}
          </select>
          <br />
          <label htmlFor="oldCompleted">Completed?</label>{" "}
          <input
            type="checkbox"
            name="oldCompleted"
            checked={modifiedCompleted}
            onChange={(event) => setModifiedCompleted(event.target.checked)}
          />
          <br />
          <button
            type="submit"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Change task
          </button>
        </form>
      ) : (
        <></>
      )}
      {/**End of first form */}
      <br />
      {/**Second form */}
      {todoList && todoList.length > 0 ? (
        <form onSubmit={handleUpdateDescription}>
          <h3>Change Task Description</h3>
          <label htmlFor="oldTaskRevision">Select task to modify</label>{" "}
          <select
            name="oldTaskRevision"
            id="oldTaskRevision"
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
          >
            {todoList.map((item, index) => {
              return (
                <option key={index} value={item.task}>
                  {item.task}
                </option>
              );
            })}
          </select>
          <br />
          <label htmlFor="oldCompleted">New Task Description</label>{" "}
          <input
            type="text"
            name="newTaskDescription"
            id="newTaskDescription"
            value={newTaskDescription}
            onChange={(event) => setNewTaskDescription(event.target.value)}
          />
          <br />
          <button
            type="submit"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Change task
          </button>
        </form>
      ) : (
        <></>
      )}
      {/**End of second form */}
      <br />
      {/**Third form */}
      <form onSubmit={handleAdd}>
        <h3>Add New Tasks</h3>
        <label htmlFor="newTask">Create new task</label>{" "}
        <input
          type="text"
          name="newTask"
          id="newTask"
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="newCompleted">Completed?</label>{" "}
        <input
          type="checkbox"
          name="newCompleted"
          checked={newCompleted}
          onChange={(event) => setNewCompleted(event.target.checked)}
        />
        <br />
        <button
          type="submit"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Add task
        </button>
      </form>
      {/**End of third form */}
      <br />
      <Link to="/">Click here to go back home</Link>
      <br />
    </div>
  );
}
