import { getTotalCommitsByUserFast } from "../services/github.service.js";
import { getUserRepos, getUserProfile } from "../services/github.service.js";

export const fetchRepos = async (req, res) => {
  try {
    console.log(process.env.GITHUB_TOKEN);
    
    const { username } = req.params;
    const repos = await getUserRepos(username);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await getUserProfile(username);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const fetchUserTotalCommitsFast = async (req, res) => {
  try {
    const { username } = req.params;
    const totalCommits = await getTotalCommitsByUserFast(username);
    res.json({ username, total_commits: totalCommits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
