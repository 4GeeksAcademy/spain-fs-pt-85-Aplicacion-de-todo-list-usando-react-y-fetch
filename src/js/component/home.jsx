import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const userName = "sergi"; 

  
  const verificarUsuario = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Usuario existente verificado.");
        return true; 
      } else if (response.status === 404) {
        console.log("Usuario no encontrado.");
        return false; 
      } else {
        console.error("Error al verificar usuario:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      return false;
    }
  };

  
  const crearUsuario = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Usuario creado correctamente.");
        return true;
      } else {
        console.error("Error al crear usuario:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return false;
    }
  };

  
  const cargarTareas = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data); 
        console.log("Tareas cargadas:", data);
      } else {
        console.error("Error al cargar tareas:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  
  useEffect(() => {
    const gestionarUsuarioYTareas = async () => {
      const usuarioExiste = await verificarUsuario();

      if (usuarioExiste) {
        
        cargarTareas();
      } else {
        const usuarioCreado = await crearUsuario();
        if (usuarioCreado) {
          cargarTareas();
        }
      }
    };

    gestionarUsuarioYTareas();
  }, []);

  const agregarTarea = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const nuevaTarea = { label: inputValue, is_done: false };
  
      try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
          method: "POST",
          body: JSON.stringify(nuevaTarea),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const tareaCreada = await response.json();
          setTodos((prevTodos) => Array.isArray(prevTodos) ? [...prevTodos, tareaCreada] : [tareaCreada]); 
          setInputValue(""); 
          console.log(`Tarea añadida: ${tareaCreada.label}`);
        } else {
          console.error("Error al añadir tarea:", response.statusText);
        }
      } catch (error) {
        console.error("Error al añadir tarea:", error);
      }
    }
  };
  
  const borrarTarea = async (todo_id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Tarea con ID ${todo_id} borrada.`);
        setTodos(todos.filter((tarea) => tarea.id !== todo_id)); 
      } else {
        console.error("Error al borrar tarea:", response.statusText);
      }
    } catch (error) {
      console.error("Error al borrar tarea:", error);
    }
  };

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
        {Array.isArray(todos) && todos.length === 0 ? ( 
          <li>No tasks, add tasks</li>
        ) : (
          Array.isArray(todos) && todos.map((item) => ( 
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
      <div className="tasks">{Array.isArray(todos) ? todos.length : 0} items left</div> 
    </div>
  );
}

export default Home;
