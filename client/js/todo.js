const API = "http://localhost:5000/api/todos";

function getToken() {
  return localStorage.getItem("token");
}

// LOAD TODOS
async function loadTodos() {
  const res = await fetch(API, {
    headers: {
      Authorization: getToken()
    }
  });

  const todos = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${todo.completed ? 'line-through' : 'none'}">
        ${todo.task}
      </span>

      <button onclick="toggleTodo('${todo._id}')">✔</button>
      <button onclick="deleteTodo('${todo._id}')">❌</button>
    `;

    list.appendChild(li);
  });
}

// ADD TODO
async function addTodo() {
  const taskInput = document.getElementById("task");

  const task = taskInput.value.trim();

  if (!task) {
    alert("Enter task");
    return;
  }

  await fetch("http://localhost:5000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ task })
  });

  taskInput.value = ""; // clear input
  loadTodos();
}

// DELETE
async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken()
    }
  });

  loadTodos();
}

// TOGGLE
async function toggleTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: getToken()
    }
  });

  loadTodos();
}

loadTodos();