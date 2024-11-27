import React, {useState,useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	
	return (
		<div className="text-center">
  <ul>
    <h1>todos</h1>
    <li>
      <input
        type="text"
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setTodos(todos.concat(inputValue));
            setInputValue("");
          }
        }}
        placeholder="What needs to be done?"
      />
    </li>
    {todos.length === 0 ? (
      <li>No tasks, add tasks</li>
    ) : (
      todos.map((item, index) => (
        <li className="todo-item">
          {item} {""}
          <i
            className="fa-solid fa-x hide-icon"
            onClick={() =>
              setTodos(todos.filter((t, currentIndex) => index !== currentIndex))
            }
          ></i>
        </li>
      ))
    )}
  </ul>
  <div className="tasks">{todos.length + " " + "items left"}</div>
</div>

	);
};

export default Home;