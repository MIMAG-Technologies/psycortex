const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const adminauth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let admin = jwt.verify(token, JWT_SECRET);
      req.username = admin.username;
    } else {
      return res.status(401).json({ message: "Token Not Provided" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = adminauth;
