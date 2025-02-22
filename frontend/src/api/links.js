export async function getLinks() {
    const res = await fetch("http://localhost:5000/api/links", { credentials: "include" });
    return res.ok ? await res.json() : [];
  }
  
  export async function addLink(link) {
    await fetch("http://localhost:5000/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(link),
    });
  }
  
  export async function deleteLink(id) {
    await fetch(`http://localhost:5000/api/links/${id}`, { method: "DELETE", credentials: "include" });
  }
  