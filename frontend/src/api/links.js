import axios from "axios";

const API_URL = "http://localhost:3000";

export const getLinks = async () => {
  try {
    const res = await axios.get(`${API_URL}/links`);
    return res.data;
  } catch (err) {
    console.error("Error fetching links:", err);
    return [];
  }
};

export const addLink = async (link) => {
  try {
    await axios.post(`${API_URL}/addlink`, link);
  } catch (err) {
    console.error("Error adding link:", err);
  }
};

export const deleteLink = async (id) => {
  try {
    await axios.delete(`${API_URL}/deletelink/${id}`);
    console.log("Link deleted successfully");
  } catch (err) {
    console.error("Error deleting link:", err.response?.data || err.message);
  }
};
