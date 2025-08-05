import Note from "../models/note.model.js";

export async function createNotes(req, res) {
  try {
    const userId = req.userId;
    const { title, content, isPublic } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please log in.", success: false });
    }

    if (!content || typeof isPublic !== "boolean") {
      return res
        .status(400)
        .json({ message: "Content and isPublic fields are required.", success: false });
    }

    const note = await Note.create({
      user: userId,
      ...(title && { title: title }),
      content,
      isPublic,
    });

    return res.status(201).json({ message: "Note created successfully", success: true, note });
  } catch (error) {
    console.error("Create note failed:", error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message, success: false });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function getAllNotesOfYours(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in.", success: false });
    }

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ notes, success: true });
  } catch (error) {
    console.error("Get all notes failed:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function getSearchedNote(req, res) {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in.", success: false });
    }

    if (!title) {
        return res.status(200).json({ notes: [], success: true });
    }

    const notes = await Note.find({
      user: userId,
      title: { $regex: title, $options: "i" },
    });

    return res.status(200).json({ notes, success: true });
  } catch (error) {
    console.error("Search failed:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

export async function updateNote(req, res) {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const { title, content, isPublic } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in.", success: false });
    }
    
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (typeof isPublic === 'boolean') updateData.isPublic = isPublic;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No update fields provided.", success: false });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or you don't have permission to update it.", success: false });
    }

    return res.status(200).json({ message: "Note updated successfully", success: true, note: updatedNote });
  } catch (error) {
    console.error("Update note failed:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Note ID format.", success: false });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message, success: false });
    }
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
}


export async function deleteNote(req, res) {
  try {
    const userId = req.userId;
    const noteIdToDelete = req.query.delete;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please log in.", success: false });
    }

    if (!noteIdToDelete) {
      return res
        .status(400)
        .json({ message: "Note ID is required for deletion.", success: false });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: noteIdToDelete,
      user: userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found or you don't have permission to delete it.",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ message: "Note deleted successfully", success: true });
  } catch (error) {
    console.error("Delete operation failed:", error);
    
    if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid Note ID format.", success: false });
    }

    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}