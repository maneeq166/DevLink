import Note from "../models/note.model";

export async function createNotes(req, res) {
  try {
    const userId = req.userId;
    const { title, content, isPublic } = req.body;

    if (!userId) {
      return res
        .status(404)
        .json({ message: "User not Found!", success: false });
    }

    if (!content || !isPublic) {
      return res
        .status(404)
        .json({ message: "Can't send nothing,can you?", success: false });
    }

    const note = await Note.create({
      user: userId,
      ...(title && { title: title }),
      content,
      isPublic,
    });

    return res.status(201).json({ message: "Created!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error?", success: false });
  }
}

export async function getAllNotesOfYours(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "Login first!", success: false });
    }

    const notes = await Note.find({ user: userId });

    return res.status(200).json({ notes, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function getSearchedNote(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "Login first!", success: false });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(404).json({ notes: [], success: false });
    } else {
      const notes = await Note.find({
        user: userId,
        title: { $regex: title, $options: "i" },
      });

      return res.status(200).json({ notes, success: true });
    }
  } catch (error) {
    console.error("Search failed:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}
