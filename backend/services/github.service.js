import axios from "axios";
import { githubConfig } from "../config/github.config.js";

export const getUserRepos = async (username) => {
  try {
    // Prepare headers
    const headers = {};
    if (githubConfig.token && githubConfig.token.trim() !== "") {
      headers.Authorization = `token ${githubConfig.token}`;
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { headers }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "GitHub API error");
  }
};

export const getUserProfile = async (username) => {
  try {
    // Prepare headers
    const headers = {};
    if (githubConfig.token && githubConfig.token.trim() !== "") {
      headers.Authorization = `token ${githubConfig.token}`;
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "GitHub API error");
  }
};
export const getTotalCommitsByUserFast = async (username) => {
  try {
    const headers = {};
    if (githubConfig.token && githubConfig.token.trim() !== "") {
      headers.Authorization = `token ${githubConfig.token}`;
    }

    // Step 1: Get all repos
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );
    const repos = reposRes.data;

    // Step 2: Map each repo to a commit-count promise
    const commitCountPromises = repos.map(async (repo) => {
      const commitsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`,
        { headers }
      );

      const linkHeader = commitsRes.headers.link;
      if (!linkHeader) {
        return commitsRes.data.length; // 0 or 1 commit
      } else {
        const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        return lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
      }
    });

    // Step 3: Wait for all promises and sum the results
    const commitCounts = await Promise.all(commitCountPromises);
    return commitCounts.reduce((sum, count) => sum + count, 0);

  } catch (error) {
    throw new Error(error.response?.data?.message || "GitHub API error");
  }
};