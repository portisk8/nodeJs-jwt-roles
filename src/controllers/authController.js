import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { verifyToken, havePermission } from "../middlewares";
import User from "../models/user";
import Role from "../models/Role";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  user.password = await user.encryptPassword(user.password);

  //Busco rol de User
  const userRol = await Role.findOne({ name: "User" });
  user.roles = [userRol._id];

  await user.save(user);

  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "1d" });

  res.json({ auth: true, token });
});
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("roles");
  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }
  const isValid = await user.validatePassword(password);
  console.log(isValid);
  if (!isValid) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "1d" });

  res.json({ auth: true, token, user });
});
router.get(
  "/me",
  [
    verifyToken.verifyToken,
    async (req, res, next) =>
      await havePermission.havePermission(
        req,
        res,
        next,
        "User,Administrator,Moderator"
      ),
  ],
  async (req, res, next) => {
    const user = await (
      await User.findById(req.userId, { password: 0, _id: 0, __v: 0 })
    ).populate("roles");
    if (!user) {
      return res.status(404).send("No se encontró el usuario");
    }
    res.json(user);
  }
);

export default router;
