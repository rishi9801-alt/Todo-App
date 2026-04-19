const API = "http://localhost:5000/api/auth";

// ---------------- REGISTER ----------------
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Registration failed");
      return;
    }

    alert("Registered Successfully!");
    window.location.href = "index.html";

  } catch (error) {
    console.log("Register Error:", error);
    alert("Server not reachable");
  }
}

// ---------------- LOGIN ----------------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    alert("Login Success!");
    window.location.href = "todo.html";

  } 
  catch (error) {
    console.log("Login Error:", error);
    alert("Server not reachable");
  }
}