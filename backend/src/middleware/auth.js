const { verifyToken } = require("../utils/auth");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Not authorized" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }

    const decoded = verifyToken(token);
    const ActualPassWord = process.env.ADMIN_PASSWORD;
    
    if (ActualPassWord !== decoded.email) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Not authorized" });
  }
};
