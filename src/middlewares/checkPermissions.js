import Role from "../models/Role";
import User from "../models/user";

export const havePermission = async (req, res, next, permiso) => {
  console.log(permiso);
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  console.log(roles);
  if (roles.some((r) => permiso.split(",").includes(r.name))) {
    console.log("Tiene Permiso");
    next();
  } else {
    return res.status(401).json("You don't have permissions.");
  }
};
