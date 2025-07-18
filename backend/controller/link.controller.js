import Link from "../models/link.model.js";
import Tag from "../models/tags.model.js";
import User from "../models/user.model.js";

export async function addLink(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user Found!", success: false });
    }

    const { title, url, tagsee } = req.body;
 

    const noteAlreadyExists = await Link.findOne({ $or: [{ title }, { url }] });

    if (noteAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Url Already Exists!", success: false });
    }

    if (!tagsee || typeof tagsee !== "string" || tagsee.trim() === "") {
      return res
        .status(400)
        .json({ message: "Tag can't be empty", success: false });
    }

    const normalizedTag = tagsee?.trim().toLowerCase();
    

   

    let tag = await Tag.findOne({ tag: normalizedTag });
    
    if (!tag) {
      try {
        
        tag = await Tag.create({ tag: normalizedTag });
      } catch (err) {
        console.log("Error creating tag:", err);
        return res
          .status(500)
          .json({ message: "Failed to create tag", success: false });
      }
    }

    if (!tag) {
      return res
        .status(404)
        .json({ message: "Something went wrong!", success: false });
    } else {
      

      const note = await Link.create({
        title,
        url,
        user: user._id,
        tags: tag._id,
      });

      if (!note) {
        return res
          .status(404)
          .json({ message: "Failed in posting!", success: false });
      } else {
        return res
          .status(201)
          .json({ message: "Successfully created!", success: true });
      }
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function getLinks(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(404)
        .json({ message: "No user Found!", success: false });
    }

    const Posts = await Link.find({ user: userId }).sort({ createdAt: -1 });

    if (!Posts) {
      return res
        .status(404)
        .json({ message: "No Posts Found!", success: false });
    }

    return res.status(200).json({ Posts, message: "Fetched Posts!" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function getLink(req, res) {
  try {
    const shortUrl = req.params.id;
    console.log("Requested shortUrl:", shortUrl);

    if (!shortUrl) {
      return res
        .status(404)
        .json({ message: "ShortUrl Not provided!", success: false });
    }

    const foundLink = await Link.findOne({ shortUrl: shortUrl });
    console.log("Found Link:", foundLink);

    if (!foundLink || !foundLink.url) {
      return res
        .status(404)
        .json({ message: "Link not found!", success: false });
    }

    return res.status(200).redirect(foundLink.url);
  } catch (error) {
    console.error("Error in getLink:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}
