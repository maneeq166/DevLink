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

//     if (!Array.isArray(tagsee)) {
//       return res
//         .status(400)
//         .json({ message: "Tags needs to be Array", success: false });
//     }

//  const tagIds = [];

// for (const rawTag of tagsee) {
//   if (!rawTag || typeof rawTag !== "string" || rawTag.trim() === "") {
//     continue;
//   }

//   const tagName = rawTag.trim().toLowerCase();

//   let tag = await Tag.findOne({ tag: tagName });

//   if (!tag) {
//     try {
//       tag = await Tag.create({ tag: tagName });
//     } catch (err) {
//       // If a duplicate key error occurred, someone else might have just created it
//       if (err.code === 11000) {
//         tag = await Tag.findOne({ tag: tagName });
//       } else {
//         console.error(`Failed to create tag '${tagName}':`, err);
//         continue; // skip this tag and continue with others
//       }
//     }
//   }

//   if (tag && tag._id) {
//     tagIds.push(tag._id);
//   }
// }




    const tag = await Tag.findOne({ tag: tagsee });
    let tagCreated = null;
    if (!tag) {
      tagCreated = await Tag.create({
        tag: tagsee,
      });
    }else{
      tagCreated=tag;
    }

    if (!tagCreated) {
      return res
        .status(404)
        .json({ message: "Something went wrong!", success: false });
    } else {
      const note = await Link.create({
        title,
        url,
        user: user._id,
        tags: tagIds,
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

    if (!shortUrl) {
      return res
        .status(404)
        .json({ message: "ShortUrl Not founded!", success: false });
    }

    const Link = await Link.findOne({ shortUrl: shortUrl });

    const { url } = Link;
    if (!url) {
      return res
        .status(404)
        .json({ message: "Link not found!", success: false });
    }

    return res.status(200).redirect(`${url}`);
  } catch (error) {
    return res.status(404).json({ message: "No user Found!", success: false });
  }
}
