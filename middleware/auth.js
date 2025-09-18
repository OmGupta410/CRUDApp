const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey"; // same as above

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("Token required!");

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
}

module.exports = auth;
