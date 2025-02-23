import axios from "axios";

const API_URL = "http://localhost:3000/deletelink"
export const getLinks = async () => {
  try {
    const res = await axios.get("http://localhost:3000/", { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Error fetching links:", err);
    return [];
  }
};

export const addLink = async (link) => {
  try {
    await axios.post("http://localhost:3000/addlink", link, { withCredentials: true });
  } catch (err) {
    console.error("Error adding link:", err);
  }
};

export const deleteLink = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    console.log("Link deleted successfully");
  } catch (err) {
    console.error("Error deleting link:", err.response?.data || err.message);
  }
};
