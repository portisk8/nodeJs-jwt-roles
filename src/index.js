import app from "./app";
import "./database";
import { createRoles } from "./libs/init/rolesData";

async function init() {
  await app.listen(3000);
  console.log("Server on 3000");
}

init();
createRoles();
