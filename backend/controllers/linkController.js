import Link from "../models/linkModel.js";

export const createLink = async (req, res) => {
  try {
    const { url } = req.body;
    const newLink = new Link({ url, user: req.user.id });
    await newLink.save();
    res.json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
