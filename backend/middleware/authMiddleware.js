import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
  try {
    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith("Bearer ")) {
      return res
        .status(404)
        .json({ message: "Token not found", success: false });
    }

    const token = authheader.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .json({ message: "Token not found", success: false });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res
        .status(404)
        .json({ message: "Token not found", success: false });
    }

    req.role = decodedToken.role;
    req.userId = decodedToken.id;

    next();
  } catch (error) {
    console.log("authMiddleware:", error);

    return res
      .status(404)
      .json({ message: "Internal Server Error", success: false });
  }
}

export default authMiddleware;
