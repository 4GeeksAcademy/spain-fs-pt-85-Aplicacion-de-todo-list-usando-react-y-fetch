import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  async function crearUsuario() {
    try {
        let response = await fetch("https://playground.4geeks.com/todo/users/sergi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            console.log("Usuario creado correctamente.");
        } else {
            console.error("Error al crear el usuario:", response.statusText);
        }

        return response.ok;
    } catch (error) {
        console.log("Error al crear el usuario:", error);
        return false;
    }
}

  async function cargarTareas() {
    try {
        const response = await fetch("https://playground.4geeks.com/todo/todos/sergi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([
                { label: "Sample Task", is_done: false } 
            ])
        });

        if (response.ok) {
            const data = await response.json();
            setTodos(data);
            console.log("Tareas cargadas:", data);
        } else {
            console.error("Error al cargar las tareas:", response.statusText);
        }
    } catch (error) {
        console.error("Error al cargar las tareas:", error);
    }
}



  async function agregarTarea(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const nuevaTarea = { label: inputValue, is_done: false };

      try {
        const response = await fetch("https://playground.4geeks.com/todo/todos/sergi", {
          method: "POST",
          body: JSON.stringify(nuevaTarea),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const tareaCreada = await response.json();
          setTodos([...todos, tareaCreada]); 
          setInputValue("");
          console.log(`Tarea añadida: ${tareaCreada.label}`);
        } else {
          console.error("Error al añadir la tarea");
        }
      } catch (error) {
        console.log("Error al agregar la tarea:", error);
      }
    }
  }

  async function borrarTarea(todo_id) {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Tarea con ID ${todo_id} borrada`);
        setTodos(todos.filter((tarea) => tarea.id !== todo_id)); 
      } else {
        console.error("Error al borrar la tarea");
      }
    } catch (error) {
      console.log("Error al intentar borrar la tarea:", error);
    }
  }

  useEffect(() => {
    (async () => {
        const usuarioCreado = await crearUsuario();
        if (usuarioCreado) {
            cargarTareas();
        }
    })();
}, []);


  return (
    <div className="text-center">
      <ul>
        <h1>todos</h1>
        <li>
          <input
            type="text"
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            onKeyDown={agregarTarea}
            placeholder="What needs to be done?"
          />
        </li>
        {todos.length === 0 ? (
          <li>No tasks, add tasks</li>
        ) : (
          todos.map((item) => (
            <li className="todo-item" key={item.id}>
              {item.label}{" "}
              <i
                className="fa-solid fa-x hide-icon"
                onClick={() => borrarTarea(item.id)}
              ></i>
            </li>
          ))
        )}
      </ul>
      <div className="tasks">{todos.length + " items left"}</div>
    </div>
  );
};

export default Home;