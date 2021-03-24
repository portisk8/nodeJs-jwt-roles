import jwt from "jsonwebtoken";
import config from "../config";

export function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    jwt.verify(req.token, config.secret, (err, authData) => {
      if (err) {
        res.status(401).json({
          auth: false,
          message: "No token provided",
        });
      } else {
        req.userId = authData.id;
        next();
      }
    });
  } else {
    res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
}
