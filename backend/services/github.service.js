import axios from "axios";
import { githubConfig } from "../config/github.config.js";

// Get public repos of any user
export const getUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `token ${githubConfig.token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "GitHub API error");
  }
};

// Get profile info of any user
export const getUserProfile = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${githubConfig.token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "GitHub API error");
  }
};
