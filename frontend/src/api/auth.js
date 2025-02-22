export async function getUser() {
    const res = await fetch("http://localhost:5000/api/auth/user", { credentials: "include" });
    return res.ok ? await res.json() : null;
  }
  
  export async function loginUser(email, password) {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    return res.ok ? await res.json() : null;
  }
  
  export async function registerUser(email, password) {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.ok ? await res.json() : null;
  }
  