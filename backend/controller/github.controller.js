import { getUserRepos, getUserProfile } from "../services/github.service.js";

export const fetchRepos = async (req, res) => {
  try {
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
