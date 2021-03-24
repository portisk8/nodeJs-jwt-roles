import Role from "../../models/Role";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    // new Role({ name: 'User' }).save();
    // new Role({ name: 'Moderator' }).save();
    // new Role({ name: "Administrator" }).save();

    //Para que corra todos los inserts al mismo tiempo
    const values = await Promise.all([
      new Role({ name: "User" }).save(),
      new Role({ name: "Moderator" }).save(),
      new Role({ name: "Administrator" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
